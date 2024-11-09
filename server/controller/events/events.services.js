const pool = require("../../middleware/db.js");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
    // Create Event
    createEvents: async (data) => {
        try {
            const { eventName, eventYear, eventstartDate, eventendDate,description } = data;
            await queryAsync(
                'INSERT INTO events (eventName, eventYear, eventstartDate, eventendDate,description) VALUES (?, ?, ?, ?, ?)',
                [eventName, eventYear, eventstartDate, eventendDate,description]
            );
            return { success: 1, message: "Event created" };
        } catch (error) {
            return { success: 0, message: error.message };
        }
    },

    // Get Events
    fetchEvents: async () => {
        try {
            const events = await queryAsync('SELECT * FROM events');
            return { success: 1, results: events };
        } catch (error) {
            return { success: 0, message: error.message };
        }
    },

    // Edit Event
    editEvent: async (data) => {
        try {
            const { eventName, eventYear, eventstartDate, eventendDate, eventId,description } = data;
            await queryAsync(
                'UPDATE events SET eventName = ?, eventYear = ?, eventstartDate = ?, eventendDate = ?, description = ? WHERE eventId = ?',
                [eventName, eventYear, eventstartDate, eventendDate,description, eventId]
            );
            return { success: 1, message: "Event updated" };
        } catch (error) {
            return { success: 0, message: error.message };
        }
    },

    // Delete Event
    deleteEvent: async (eventId) => {
        try {
            await queryAsync('DELETE FROM events WHERE eventId = ?', [eventId]);
            return { success: 1, message: "Event deleted" };
        } catch (error) {
            return { success: 0, message: error.message };
        }
    },

    fetchEventById:async(eventId) =>{
        try {
            const res = await queryAsync("SELECT * FROM events where eventId = ?",[eventId])
            console.log(res)
            return { success: 1, results:res };
        } catch (error) {
            return { success: 0, message: error.message };
        }
    },

    addSportsEvents: async (data) => {
        try {
          const teams = JSON.parse(data.teams);
          const res = await queryAsync(
            "INSERT INTO sports_events (sportsId, eventsId, bracketType) VALUES (?, ?, ?)",
            [data.sportsId, data.eventsId, data.bracketType]
          );
      
          if (!teams.length) {
            return { success: 0, message: 'No teams to process' };
          }
          const sportEventsId = res.insertId;  
          const teamToInsert = teams.map((team) => [
            sportEventsId,
            team.teamCoach,
            team.teamName,
          ]);
          await queryAsync(
            "INSERT INTO teams_events (sportEventsId, teamCoach, teamName) VALUES ?",
            [teamToInsert]
          );
      
          return { success: 1, message: 'Sports event and teams added successfully' };
        } catch (error) {
          console.error("Error adding sports event and teams:", error);
          return { success: 0, message: error.message };
        }
      }
      
};
