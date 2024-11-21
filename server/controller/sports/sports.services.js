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
      const { sportsName, sportsLogo, description } = data;
      await checkUniqueField('sports', 'sportsName', sportsName);
      const imageUrl = await uploadImage(sportsLogo, sportsLogo.originalname);
      await queryAsync(
        "INSERT INTO sports (sportsName, sportsLogo, description) VALUES (?, ?, ?)",
        [sportsName, imageUrl, description]
      );
      return {
        success: 1,
        message: "New Sport added successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  // Fetch all teams
  fetchSports: async () => {
    try {
      const sportLists = await queryAsync("SELECT * FROM sports");
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
      let { sportsName, sportsLogo, description, sportsId } = data;
      const existingData = await checkIfExists('sports', 'sportsId', sportsId)
      await checkUniqueField('sports', 'sportsName', sportsName, existingData.sportsName);
      let imageUrl = sportsLogo;
      if (typeof sportsLogo !== "string") {
        imageUrl = await uploadImage(sportsLogo, sportsLogo.originalname, existingData.sportsLogo); 
      }
      await queryAsync(
        "UPDATE sports SET sportsName = ?, sportsLogo = ?, description = ? WHERE sportsId = ?",
        [sportsName, imageUrl, description, sportsId]
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
      const existingData = await checkIfExists('sports', 'sportsId', id)
      if(existingData.sportsLogo){
        await deleteImageByURL(existingData.sportsLogo)
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
      // Fetch Sports
      const sports = await queryAsync(`
        SELECT sportsId, sportsName, sportsLogo, description, createdAt
        FROM sports
      `);
  
      // Fetch Teams with Coaches
      const teams = await queryAsync(`
        SELECT t.teamId, t.teamName, t.teamLogo, t.dateAdded, u.username AS coachName
        FROM teams t
        LEFT JOIN users u ON t.teamCoach = u.id
      `);
  
      // Fetch Events
      const events = await queryAsync(`
        SELECT eventId, eventName, eventYear, eventstartDate, eventendDate, description
        FROM events
      `);
  
      // Fetch Sports Events with Participating Teams
      const sportsEvents = await queryAsync(`
        SELECT
          se.sportEventsId,
          se.eventsId,
          s.sportsName,
          s.sportsLogo,
          e.eventName,
          e.eventstartDate,
          e.eventendDate,
          se.bracketType,
          se.maxPlayers,
          GROUP_CONCAT(
            CONCAT(
              '{"teamEventId":', te.teamEventId,
              ',"teamName":"', t.teamName,
              '","teamWin":', IFNULL(te.teamWin, 0),
              ',"teamLose":', IFNULL(te.teamLose, 0),
              '}'
            )
          ) AS participatingTeams
        FROM sports_events se
        LEFT JOIN sports s ON se.sportsId = s.sportsId
        LEFT JOIN events e ON se.eventsId = e.eventId
        LEFT JOIN teams_events te ON se.sportEventsId = te.sportEventsId
        LEFT JOIN teams t ON te.teamId = t.teamId
        GROUP BY se.sportEventsId
      `);
  
      const parsedSportsEvents = sportsEvents.map((event) => ({
        ...event,
        participatingTeams: event.participatingTeams
          ? JSON.parse(`[${event.participatingTeams}]`)
          : [],
      }));
  
      // Fetch Matches
      const matches = await queryAsync(`
        SELECT 
          m.matchId, m.round, m.schedule, m.status, 
          t1.teamName AS team1Name, t2.teamName AS team2Name,
          m.team1Score, m.team2Score, m.winner_team_id,
          m.roundType, m.bracketType, m.eliminationStage
        FROM matches m
        LEFT JOIN teams t1 ON m.team1Id = t1.teamId
        LEFT JOIN teams t2 ON m.team2Id = t2.teamId
      `);
  
      return {
        success: 1,
        results: {
          sports,
          teams,
          events,
          sportsEvents: parsedSportsEvents,
          matches,
        },
        message: "All data fetched successfully",
      };
    } catch (error) {
      console.error(error);
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  }
  

};
