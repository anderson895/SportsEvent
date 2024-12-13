const { checkUniqueField } = require("../../helpers/checkUniqueness.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const {
  uploadImage,
  deleteImageByURL,
  generateUniqueFilename,
} = require("../../middleware/utils.js");
const { checkIfExists } = require("../../helpers/checkIfExist.js");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  createTeams: async (data) => {
    try {
      const { teamName, teamCoach, teamLogo,addedBy} = data;
      await checkUniqueField("teams", "teamName", teamName);
      const imageUrl = await uploadImage(teamLogo, teamLogo.originalname);
      await queryAsync(
        "INSERT INTO teams (teamName, teamLogo, teamCoach,addedBy) VALUES (?, ?, ?,?)",
        [teamName, imageUrl, teamCoach,addedBy]
      );
      const updatedTeams = await queryAsync("SELECT * FROM teams");
      return {
        success: 1,
        results: updatedTeams,
        message: "New Team added successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  fetchTeams: async () => {
    try {
      const teamLists = await queryAsync(`
        SELECT 
          t.teamId,
          t.teamName,
          t.teamLogo,
          t.dateAdded,
          t.addedBy,
          t.updatedBy,
          u.username AS coachName,
          u.id AS coachId,
          ua.username AS addedByName, -- Join for addedBy
          uu.username AS updatedByName -- Join for updatedBy
        FROM teams t
        LEFT JOIN users u ON t.teamCoach = u.id -- Join for team coach
        LEFT JOIN users ua ON t.addedBy = ua.id -- Join for addedBy
        LEFT JOIN users uu ON t.updatedBy = uu.id -- Join for updatedBy
      `);
      console.log(teamLists)
      return {
        success: 1,
        results: teamLists,
        message: "Fetched successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },  

  fetchTeamInfo: async (data) => {
    const { teamId } = data;

    try {
      const teamQuery = `
        SELECT teamName, teamLogo, dateAdded
        FROM teams
        WHERE teamId = ?
      `;
      const teamInfo = await queryAsync(teamQuery, [teamId]);

      if (!teamInfo.length) {
        return { success: 0, message: "Team not found" };
      }

      const eventsQuery = `
        SELECT e.eventId, e.eventName, e.eventstartDate, e.eventendDate
        FROM teams_events te
        INNER JOIN sports_events se ON te.sportEventsId = se.sportEventsId
        INNER JOIN events e ON se.eventsId = e.eventId
        WHERE te.teamId = ?
        GROUP BY e.eventId
      `;
      const events = await queryAsync(eventsQuery, [teamId]);

      const sportsEventsQuery = `
        SELECT
          se.sportEventsId,
          se.eventsId,
          s.sportsName,
          se.bracketType,
          se.maxPlayers,
          u.username AS coachName,
          te.teamEventId,
          te.teamWin,
          te.teamLose
        FROM teams_events te
        LEFT JOIN sports_events se ON te.sportEventsId = se.sportEventsId
        LEFT JOIN sports s ON se.sportsId = s.sportsId
        LEFT JOIN users u ON te.coachId = u.id
        WHERE te.teamId = ?
      `;
      const sportsEvents = await queryAsync(sportsEventsQuery, [teamId]);

      const playersQuery = `
        SELECT
          p.playerId,
          p.playerName,
          p.position,
          p.medicalCertificate,
          p.teamEventId
        FROM players p
        WHERE p.teamEventId IN (
          SELECT te.teamEventId
          FROM teams_events te
          WHERE te.teamId = ?
        )
      `;
      const players = await queryAsync(playersQuery, [teamId]);

      const playersByTeamEvent = players.reduce((acc, player) => {
        if (!acc[player.teamEventId]) {
          acc[player.teamEventId] = [];
        }
        acc[player.teamEventId].push(player);
        return acc;
      }, {});

      const sportsEventsWithPlayers = sportsEvents.map((sportEvent) => ({
        ...sportEvent,
        players: playersByTeamEvent[sportEvent.teamEventId] || [],
      }));

      const sportEventsByEvent = sportsEventsWithPlayers.reduce(
        (acc, sportEvent) => {
          if (!acc[sportEvent.eventsId]) {
            acc[sportEvent.eventsId] = [];
          }
          acc[sportEvent.eventsId].push(sportEvent);
          return acc;
        },
        {}
      );

      const eventsWithSports = events.map((event) => ({
        ...event,
        sportEvents: sportEventsByEvent[event.eventId] || [],
      }));

      const response = {
        team: teamInfo[0],
        events: eventsWithSports,
      };

      return { success: 1, results: response };
    } catch (error) {
      console.error("Error fetching team information:", error);
      return { success: 0, message: "Internal Server Error" };
    }
  },

  editTeam: async (data) => {
    try {
      let { teamName, teamCoach, teamLogo, teamId,updatedBy } = data;
      const existingData = await checkIfExists("teams", "teamId", teamId);
      await checkUniqueField(
        "teams",
        "teamName",
        teamName,
        existingData.teamName
      );
      let imageUrl = teamLogo;
      if (typeof teamLogo !== "string") {
        imageUrl = await uploadImage(
          teamLogo,
          teamLogo.originalname,
          existingData.teamLogo
        );
      }
      await queryAsync(
        "UPDATE teams SET teamName = ?, teamLogo = ?, teamCoach = ?,updatedBy=? WHERE teamId = ?",
        [teamName, imageUrl, teamCoach,updatedBy, teamId]
      );
      const updatedTeam = await queryAsync("SELECT * FROM teams");

      return {
        success: 1,
        results: updatedTeam,
        message: "Team updated successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  deleteTeam: async (id) => {
    try {
      const existingData = await checkIfExists("teams", "teamId", id);
      if (existingData.teamLogo) {
        await deleteImageByURL(existingData.teamLogo);
      }
      await queryAsync("DELETE FROM teams WHERE teamId = ?", [id]);
      const remainingTeams = await queryAsync("SELECT * FROM teams");
      return {
        success: 1,
        results: remainingTeams,
        message: "Team deleted successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  fetchCoaches: async () => {
    try {
      const res = await queryAsync("SELECT * FROM users where type = 'Coach'");
      return { success: 1, results: res };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },
  addPlayer: async (data) => {
    try {
      const { playerName, position, medicalCertificate, teamEventId } = data;
      const imageUrl = await uploadImage(
        medicalCertificate,
        medicalCertificate.originalname
      );
      await queryAsync(
        "INSERT INTO players (teamEventId, playerName, position,medicalCertificate) VALUES (?, ?, ?,?)",
        [teamEventId, playerName, position, imageUrl]
      );
      return { success: 1, message: "Player added successfully" };
    } catch (error) {
      console.error("Error adding player:", error);
      return { success: 0, message: "Failed to add player" };
    }
  },
  deletePlayer: async (playerId) => {
    try {
      const existingData = await checkIfExists("players", "playerId", playerId);
      if (existingData.medicalCertificate) {
        await deleteImageByURL(existingData.medicalCertificate);
      }

      await queryAsync("DELETE FROM players WHERE playerId = ?", [playerId]);

      const remainingPlayers = await queryAsync("SELECT * FROM players");

      return {
        success: 1,
        results: remainingPlayers,
        message: "Player deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting player:", error);
      return {
        success: 0,
        message: error.message || "Failed to delete player",
      };
    }
  },
};
