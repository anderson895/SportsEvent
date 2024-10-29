const pool = require("../../middleware/db.js");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
    // Create Event
    createEvents: async (data) => {
        try {
            const { eventName, eventYear, eventstartDate, eventendDate } = data;
            await queryAsync(
                'INSERT INTO events (eventName, eventYear, eventstartDate, eventendDate) VALUES (?, ?, ?, ?)',
                [eventName, eventYear, eventstartDate, eventendDate]
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
            const { eventName, eventYear, eventstartDate, eventendDate, eventId } = data;
            await queryAsync(
                'UPDATE events SET eventName = ?, eventYear = ?, eventstartDate = ?, eventendDate = ? WHERE eventId = ?',
                [eventName, eventYear, eventstartDate, eventendDate, eventId]
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
    }
};
