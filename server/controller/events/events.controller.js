const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const {
  createEvents,
  fetchEvents,
  editEvent,
  deleteEvent,
  fetchEventById,
  addSportsEvents,
  generateMatch,
  bracketMatch,
  singleSetWinner,
  setSchedule,
  doubleSetWinner,
  roundSetWinner,
  eventsListSports,
} = require("./events.services");

module.exports = {
  AddEvents: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, createEvents(data));
    } catch (error) {
      errorException(error, res);
    }
  },
  EventLists: (req, res) => {
    try {
      handleResponse(res, fetchEvents());
    } catch (error) {
      errorException(error, res);
    }
  },
  EditEvents: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, editEvent(data));
    } catch (error) {
      errorException(error, res);
    }
  },
  DeleteEvent: (req, res) => {
    try {
      const data = req.params.eventId;
      handleResponse(res, deleteEvent(data));
    } catch (error) {
      errorException(error, res);
    }
  },

  EventInfo: (req, res) => {
    try {
      const data = req.params;
      handleResponse(res, fetchEventById(data));
    } catch (error) {
      errorException(error, res);
    }
  },
  SportsEvents: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, addSportsEvents(data));
    } catch (error) {
      errorException(error, res);
    }
  },
  CreateMatch: (req, res) => {
    try {
      let data = req.body;
      if (!data.teams) {
        return res.json(500).message({ success: 0, message: "No teams" });
      }

      data.teams = JSON.parse(data.teams);
      handleResponse(res, generateMatch(data));
    } catch (error) {
      errorException(error, res);
    }
  },
  BracketMatches: (req, res) => {
    try {
      const data = req.params;
      handleResponse(res, bracketMatch(data));
    } catch (error) {
      errorException(error, res);
    }
  },

  SingleSetScore: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, singleSetWinner(data));
    } catch (error) {
      errorException(error, res);
    }
  },
  DoubleSetScore: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, doubleSetWinner(data));
    } catch (error) {
      errorException(error, res);
    }
  },
  RoundRobinSetScore: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, roundSetWinner(data));
    } catch (error) {
      errorException(error, res);
    }
  },

  SetMatchSchedule: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, setSchedule(data));
    } catch (error) {
      errorException(error, res);
    }
  },

  SportsEventsListed: (req, res) => {
    try {
      handleResponse(res, eventsListSports());
    } catch (error) {
      errorException(error, res);
    }
  },
};
