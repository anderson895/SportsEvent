const {
  generateSingleEliminationMatches,
  generateDoubleEliminationMatches,
  generateRoundRobinMatches,
  setTeamInNextMatch,
  checkForChampion,
} = require("../../helpers/brackets.js");
const {
  getSportsEventsWithDetails,
} = require("../../helpers/fetchSportInfo.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  // Create Event
  createEvents: async (data) => {
    try {
      const {
        eventName,
        eventYear,
        eventstartDate,
        eventendDate,
        description,
      } = data;
      await queryAsync(
        "INSERT INTO events (eventName, eventYear, eventstartDate, eventendDate,description) VALUES (?, ?, ?, ?, ?)",
        [eventName, eventYear, eventstartDate, eventendDate, description]
      );
      return { success: 1, message: "Event created" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  // Get Events
  fetchEvents: async () => {
    try {
      const events = await queryAsync("SELECT * FROM events");
      return { success: 1, results: events };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  // Edit Event
  editEvent: async (data) => {
    try {
      const {
        eventName,
        eventYear,
        eventstartDate,
        eventendDate,
        eventId,
        description,
      } = data;
      await queryAsync(
        "UPDATE events SET eventName = ?, eventYear = ?, eventstartDate = ?, eventendDate = ?, description = ? WHERE eventId = ?",
        [
          eventName,
          eventYear,
          eventstartDate,
          eventendDate,
          description,
          eventId,
        ]
      );
      return { success: 1, message: "Event updated" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  // Delete Event
  deleteEvent: async (eventId) => {
    try {
      await queryAsync("DELETE FROM events WHERE eventId = ?", [eventId]);
      return { success: 1, message: "Event deleted" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  fetchEventById: async (data) => {
    const eventId = data.eventId
    console.log(data)
    if (!eventId) {
      return { success: 0, message: "Invalid event ID provided." };
    }
  
    try {
      const event = await queryAsync("SELECT * FROM events WHERE eventId = ?", [eventId]);
      console.log("Fetched event:", event);
  
      if (!event.length) {
        return { success: 1, results: { event: null, sportsEvents: [] } };
      }
  
      const sportsEvents = await queryAsync(
        "SELECT * FROM sports_events WHERE eventsId = ?",
        [eventId]
      );
      console.log("Fetched sports events:", sportsEvents);
  
      const sportsEventsWithDetails = await getSportsEventsWithDetails(sportsEvents);
  
      const details = {
        event: event[0],
        sportsEvents: sportsEventsWithDetails,
      };
  
      return { success: 1, results: details };
    } catch (error) {
      console.error("Error fetching event by ID:", error);
      return { success: 0, message: error.message };
    }
  },  

  addSportsEvents: async (data) => {
    try {
      const teams = JSON.parse(data.teams || [])
      if (!teams.length) {
        return { success: 0, message: "No teams to process" };
      }
      const res = await queryAsync(
        "INSERT INTO sports_events (sportsId, eventsId, bracketType) VALUES (?, ?, ?)",
        [data.sportsId, data.eventsId, data.bracketType]
      );
      const sportEventsId = res.insertId;
      const teamToInsert = teams.map((team) => [
        sportEventsId,
        team.teamCoach,
        team.teamName,
        team.teamId,
      ]);
      await queryAsync(
        "INSERT INTO teams_events (sportEventsId, teamCoach, teamName,teamId) VALUES ?",
        [teamToInsert]
      );

      return {
        success: 1,
        message: "Sports event and teams added successfully",
      };
    } catch (error) {
      console.error("Error adding sports event and teams:", error);
      return { success: 0, message: error.message };
    }
  },

  generateMatch: async (data) => {
    try {
      let { sportEventsId, teams, bracketType } = data;

      switch (bracketType) {
        case "Single Elimination":
          await generateSingleEliminationMatches(sportEventsId, teams);
          break;
        case "Double Elimination":
          await generateDoubleEliminationMatches(sportEventsId, teams);
          break;
        case "Round Robin":
          await generateRoundRobinMatches(sportEventsId, teams);
          break;
        default:
          return { success: 0, message: "Invalid bracket type" };
      }

      return {
        success: 1,
        message: `${bracketType} matches generated successfully`,
      };
    } catch (error) {
      console.log(error);
      return { success: 0, message: error.message };
    }
  },

  bracketMatch: async (data) => {
    try {
      const sportsId = data.sportEventsId;
      const res = await queryAsync(
        "SELECT * FROM brackets where sportsId = ?",
        [sportsId]
      );
      const res1 = await queryAsync(
        "SELECT * FROM matches where sportEventsId = ?",
        [sportsId]
      );

      return {
        success: 1,
        results: {
          details: res,
          matches: res1,
        },
      };
    } catch (error) {
      console.log(error);
      return { success: 0, message: error.message };
    }
  },

  singleSetWinner: async (data) => {
    let { team1Score, team2Score, matchId } = data;
    team1Score = Number(team1Score);
    team2Score = Number(team2Score);

    try {
      const match = await queryAsync(
        "SELECT * FROM matches WHERE matchId = ?",
        [matchId]
      );
      if (match.length === 0) {
        return { success: 0, error: "Match not found" };
      }

      const currentMatch = match[0];
      const { team1Id, team2Id, next_match_id } = currentMatch;

      if (team1Score === undefined || team2Score === undefined) {
        return { success: 0, error: "Scores for both teams are required" };
      }

      let winnerId;
      if (team1Score > team2Score) {
        winnerId = team1Id;
      } else if (team2Score > team1Score) {
        winnerId = team2Id;
      } else {
        return {
          success: 0,
          error: "Scores are tied, please resolve the tie.",
        };
      }

      await queryAsync(
        'UPDATE matches SET team1Score = ?, team2Score = ?, winner_team_id = ?, status = "Completed" WHERE matchId = ?',
        [team1Score, team2Score, winnerId, matchId]
      );

      if (next_match_id) {
        const nextMatch = await queryAsync(
          "SELECT * FROM matches WHERE matchId = ?",
          [next_match_id]
        );

        if (nextMatch.length > 0) {
          const nextMatchRecord = nextMatch[0];
          const updateField = nextMatchRecord.team1Id ? "team2Id" : "team1Id";

          await queryAsync(
            `UPDATE matches SET ${updateField} = ? WHERE matchId = ?`,
            [winnerId, next_match_id]
          );
          console.log(
            `Winner Team ${winnerId} advanced to match ${next_match_id}`
          );
        }
      }

      return {
        success: 1,
        message: "Match scores updated successfully",
        winnerId,
      };
    } catch (error) {
      console.error(error);
      return { success: 0, message: error.message };
    }
  },

  doubleSetWinner: async (data) => {
    const { team1Score, team2Score, matchId } = data;

    try {
      const matchResult = await queryAsync(
        "SELECT * FROM matches WHERE matchId = ?",
        [matchId]
      );
      if (matchResult.length === 0)
        return { success: 0, message: "Match not found" };

      const match = matchResult[0];
      const {
        team1Id,
        team2Id,
        bracketType,
        next_match_id,
        loser_next_match_id,
        isFinal,
      } = match;

      let winnerTeamId, loserTeamId;
      if (team1Score > team2Score) {
        winnerTeamId = team1Id;
        loserTeamId = team2Id;
      } else if (team2Score > team1Score) {
        winnerTeamId = team2Id;
        loserTeamId = team1Id;
      } else {
        return {
          success: 0,
          message: "Scores cannot be equal in elimination matches.",
        };
      }

      await queryAsync(
        "UPDATE matches SET team1Score = ?, team2Score = ?, winner_team_id = ?, status = 'completed' WHERE matchId = ?",
        [team1Score, team2Score, winnerTeamId, matchId]
      );

      if (bracketType === "winners") {
        if (next_match_id) {
          await setTeamInNextMatch(next_match_id, winnerTeamId);
        }
        if (loser_next_match_id) {
          await setTeamInNextMatch(loser_next_match_id, loserTeamId);
        }
      } else if (bracketType === "losers") {
        if (next_match_id) {
          await setTeamInNextMatch(next_match_id, winnerTeamId);
        } else if (loser_next_match_id) {
          await setTeamInNextMatch(loser_next_match_id, winnerTeamId);
        }
      }

      const champion = await checkForChampion(winnerTeamId, loserTeamId, match);
      if (champion) {
        return { success: 1, message: "Champion decided", champion };
      }

      return {
        success: 1,
        message: "Winner set and progression updated successfully.",
      };
    } catch (error) {
      console.error(error);
      return {
        success: 0,
        message: "An error occurred while updating the winner.",
      };
    }
  },
  roundSetWinner: async (data) => {
    let { team1Score, team2Score, matchId } = data;
    team1Score = Number(team1Score);
    team2Score = Number(team2Score);

    try {
      const match = await queryAsync(
        "SELECT * FROM matches WHERE matchId = ?",
        [matchId]
      );
      if (match.length === 0) {
        return { success: 0, error: "Match not found" };
      }

      const currentMatch = match[0];
      const { team1Id, team2Id } = currentMatch;

      if (team1Score === undefined || team2Score === undefined) {
        return { success: 0, error: "Scores for both teams are required" };
      }

      let winnerId;
      if (team1Score > team2Score) {
        winnerId = team1Id;
      } else if (team2Score > team1Score) {
        winnerId = team2Id;
      } else {
        return {
          success: 0,
          error: "Scores are tied, please resolve the tie.",
        };
      }

      await queryAsync(
        'UPDATE matches SET team1Score = ?, team2Score = ?, winner_team_id = ?, status = "Completed" WHERE matchId = ?',
        [team1Score, team2Score, winnerId, matchId]
      );
      return {
        success: 1,
        message: "Match scores updated successfully",
        winnerId,
      };
    } catch (error) {
      console.error(error);
      return { success: 0, message: error.message };
    }
  },

  setSchedule: async (data) => {
    console.log(data);
    const { schedule, matchId,venue } = data;

    if (!schedule) {
      return { success: 0, error: "Schedule is required." };
    }

    try {
      const match = await queryAsync(
        "SELECT * FROM matches WHERE matchId = ?",
        [matchId]
      );

      if (match.length === 0) {
        return { success: 0, error: "Match not found." };
      }

      await queryAsync(
        'UPDATE matches SET schedule = ?, status = "Scheduled", venue = ? WHERE matchId = ?',
        [schedule,venue, matchId]
      );

      return { success: 1, message: "Match schedule updated successfully." };
    } catch (error) {
      console.error("Error updating match schedule:", error);
      return {
        success: 0,
        error: "An error occurred while updating the match schedule.",
      };
    }
  },
};
