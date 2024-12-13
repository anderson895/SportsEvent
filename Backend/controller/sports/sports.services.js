const { checkUniqueField } = require("../../helpers/checkUniqueness.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const { uploadImage, deleteImageByURL } = require("../../middleware/utils.js");
const { checkIfExists } = require("../../helpers/checkIfExist.js");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  // Create a new team
  createSports: async (data) => {
    try {
      const { sportsName, sportsLogo, description,createdBy } = data;
      await checkUniqueField("sports", "sportsName", sportsName);
      const imageUrl = await uploadImage(sportsLogo, sportsLogo.originalname);
      await queryAsync(
        "INSERT INTO sports (sportsName, sportsLogo, description,createdBy) VALUES (?, ?, ?,?)",
        [sportsName, imageUrl, description,createdBy]
      );
      return {
        success: 1,
        message: "New Sport added successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  fetchSports: async () => {
    try {
      const sportLists = await queryAsync(`
        SELECT 
          s.sportsId,
          s.sportsName,
          s.sportsLogo,
          s.description,
          s.createdAt,
          s.createdBy,
          u1.username AS createdByUsername,
          s.updatedBy,
          u2.username AS updatedByUsername
        FROM sports s
        LEFT JOIN users u1 ON s.createdBy = u1.id
        LEFT JOIN users u2 ON s.updatedBy = u2.id
      `);
      return {
        success: 1,
        results: sportLists,
        message: "Fetched successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  // Edit a team by ID
  editSports: async (data) => {
    try {
      let { sportsName, sportsLogo, description, sportsId,updatedBy } = data;
      const existingData = await checkIfExists("sports", "sportsId", sportsId);
      await checkUniqueField(
        "sports",
        "sportsName",
        sportsName,
        existingData.sportsName
      );
      let imageUrl = sportsLogo;
      if (typeof sportsLogo !== "string") {
        imageUrl = await uploadImage(
          sportsLogo,
          sportsLogo.originalname,
          existingData.sportsLogo
        );
      }
      await queryAsync(
        "UPDATE sports SET sportsName = ?, sportsLogo = ?, description = ?,updatedBy=? WHERE sportsId = ?",
        [sportsName, imageUrl, description,updatedBy, sportsId]
      );

      return {
        success: 1,
        message: "Team updated successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  deleteSports: async (id) => {
    try {
      const existingData = await checkIfExists("sports", "sportsId", id);
      if (existingData.sportsLogo) {
        await deleteImageByURL(existingData.sportsLogo);
      }
      await queryAsync("DELETE FROM sports WHERE sportsId = ?", [id]);
      return {
        success: 1,
        message: "Sports deleted successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },
  fetchAllData: async () => {
    try {
      const events = await queryAsync(`
        SELECT eventId, eventName, eventYear, eventstartDate, eventendDate, description
        FROM events
      `);

      const media = await queryAsync(`
        SELECT *
        FROM media
      `);

      const sports = await queryAsync(`
        SELECT sportsId, sportsName, sportsLogo, description, createdAt
        FROM sports
      `);
      const coach = await queryAsync(`
        SELECT *
        FROM users where type = 'Coach'
      `);

      const teams = await queryAsync(`
        SELECT t.teamId, t.teamName, t.teamLogo, t.dateAdded, u.username AS coachName
        FROM teams t
        LEFT JOIN users u ON t.teamCoach = u.id
      `);

      const eventPromises = events.map(async (event, idx) => {
        const sportsEvents = await queryAsync(
          `
          SELECT 
            se.sportEventsId,
            se.eventsId,
            s.sportsName,
            s.sportsLogo,
            se.bracketType,
            se.maxPlayers,
            GROUP_CONCAT(DISTINCT
              CONCAT(
                '{"teamEventId":', te.teamEventId,
                ',"teamName":"', REPLACE(te.teamName, '"', '\"'), '",',
                '"teamLogo":"', REPLACE(t.teamLogo, '"', '\"'), '",',
                '"teamId":"', REPLACE(t.teamId, '"', '\"'), '",',
                '"teamWin":', IFNULL(te.teamWin, 0), ',',
                '"teamLose":', IFNULL(te.teamLose, 0), ',',
                '"players":[', 
                  COALESCE(
                    (
                      SELECT GROUP_CONCAT(DISTINCT
                        CONCAT(
                          '{"playerId":', p.playerId,
                          ',"playerName":"', REPLACE(p.playerName, '"', '\"'), '",',
                          '"position":"', REPLACE(p.position, '"', '\"'), '",',
                          '"medicalCertificate":"', REPLACE(p.medicalCertificate, '"', '\"'), '"}'
                        )
                      )
                      FROM players p 
                      WHERE p.teamEventId = te.teamEventId
                    ),
                    ''
                  ),
                ']}'
              )
            ) AS participatingTeams
          FROM sports_events se
          LEFT JOIN sports s ON se.sportsId = s.sportsId
          LEFT JOIN teams_events te ON se.sportEventsId = te.sportEventsId
          LEFT JOIN teams t ON te.teamId = t.teamId
          WHERE se.eventsId = ?
          GROUP BY se.sportEventsId;
          `,
          [event.eventId] // Pass the current event ID dynamically
        );
      
        const parsedSportsEvents = sportsEvents.map((sportEvent) => ({
          ...sportEvent,
          participatingTeams: sportEvent.participatingTeams
            ? JSON.parse(`[${sportEvent.participatingTeams}]`)
            : [],
        }));
      
        const matchPromises = parsedSportsEvents.map(async (sportEvent) => {
          const matches = await queryAsync(
            `
            SELECT 
              *, 
              t1.teamName AS team1Name, t1.teamLogo AS team1Logo,
              t2.teamName AS team2Name, t2.teamLogo AS team2Logo,
              m.team1Score, m.team2Score, m.winner_team_id,
              m.roundType, m.bracketType, m.eliminationStage
            FROM matches m
            LEFT JOIN teams t1 ON m.team1Id = t1.teamId
            LEFT JOIN teams t2 ON m.team2Id = t2.teamId
            WHERE m.sportEventsId = ?
            `,
            [sportEvent.sportEventsId]
          );
      
          return { ...sportEvent, matches };
        });
      
        return Promise.all(matchPromises);
      });
      

      const enrichedEvents = await Promise.all(eventPromises);
      const finalEvents = events.map((event, index) => ({
        ...event,
        sportsEvents: enrichedEvents[index],
      }));

      return {
        success: 1,
        results: {
          events: finalEvents,
          media,
          teams,
          sports,
          coach,
        },
        message: "All data fetched successfully",
      };
    } catch (error) {
      console.error(error);
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },
};
