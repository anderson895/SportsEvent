const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { fetchMatches, fetchMatchById, incrementScore, gameStatus } = require("./games.services")


module.exports ={
    MatchSchedule: (req, res) => {
        try {
          handleResponse(res, fetchMatches());
        } catch (error) {
          errorException(error, res);
        }
      },
      MatchById: (req, res) => {
        try {
          const data =req.params
          handleResponse(res, fetchMatchById(data));
        } catch (error) {
          errorException(error, res);
        }
      },
      IncrementScore: (req, res) => {
        try {
          const data = req.body
          handleResponse(res, incrementScore(data));
        } catch (error) {
          errorException(error, res);
        }
      },
      GameStatus: (req, res) => {
        try {
          const data = req.body
          handleResponse(res, gameStatus(data));
        } catch (error) {
          errorException(error, res);
        }
      },
}