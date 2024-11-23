const { getSportsEventsWithDetails } = require("../../helpers/fetchSportInfo.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  fetchMatches: async () => {
    try {
      const matches = await queryAsync("SELECT * FROM matches");

      const matchesWithTeams = await Promise.all(
        matches.map(async (match) => {
          const team1 = await queryAsync("SELECT * FROM teams WHERE teamId = ?", [match.team1Id]);
          const team2 = await queryAsync("SELECT * FROM teams WHERE teamId = ?", [match.team2Id]);
          const sportEvent = await queryAsync("SELECT * FROM sports_events where sportEventsId =?",[match.sportEventsId])
          const event = await queryAsync("SELECT * FROM events where eventId = ?",[sportEvent[0].eventsId])
          const sport = await queryAsync("SELECT * from sports where sportsId = ?",[sportEvent[0].sportsId])
          return {
            ...match,
            team1: team1[0] || null,
            team2: team2[0] || null,
            sportEvent:sportEvent[0] || null,
            event:event[0] || null,
            sport:sport[0] || null,
          };
        })
      );

      return { success: 1, results: matchesWithTeams };
    } catch (error) {
      console.error("Error fetching matches:", error);
      return { success: 0, message: error.message };
    }
  },

  fetchMatchById: async (data) => {
    try {
        const matchId = data.matchId
      const match = await queryAsync("SELECT * FROM matches WHERE matchId = ?", [matchId]);
      if (!match.length) {
        return { success: 0, message: "Match not found" };
      }

      const team1 = await queryAsync("SELECT * FROM teams WHERE teamId = ?", [match[0].team1Id]);
      const team2 = await queryAsync("SELECT * FROM teams WHERE teamId = ?", [match[0].team2Id]);
      const sportEvent = await queryAsync("SELECT * FROM sports_events where sportEventsId =?",[match[0].sportEventsId])
      const event = await queryAsync("SELECT * FROM events where eventId = ?",[sportEvent[0].eventsId])
      const sport = await queryAsync("SELECT * from sports where sportsId = ?",[sportEvent[0].sportsId])
   
      const matchWithTeams = {
        ...match[0],
        team1: team1[0] || null,
        team2: team2[0] || null,
        sportEvent:sportEvent[0] || null,
        event:event[0] || null,
        sport:sport[0] || null,
      };

      return { success: 1, results: matchWithTeams };
    } catch (error) {
      console.error("Error fetching match by ID:", error);
      return { success: 0, message: error.message };
    }
  },

  incrementScore:async(data) =>{
    let { matchId, teamId, increment } = data;
    teamId = Number(teamId)
    increment = Number(increment)
    if (!matchId || !teamId || !increment) {
      return { success: 0, message: 'Invalid parameters.' }
    }
  
    try {
      const matchQuery = 'SELECT * FROM matches WHERE matchId = ?';
      const matchResults = await queryAsync(matchQuery, [matchId]);
      if (matchResults.length === 0) {
        return { success: 0, message: 'Match not found.' }
      }
  
      const match = matchResults[0];
  
      let updatedScore;
      if (match.team1Id === teamId) {
        updatedScore = Number(match.team1Score) + Number(increment);
        await queryAsync('UPDATE matches SET team1Score = ? WHERE matchId = ?', [updatedScore, matchId]);
      } else if (match.team2Id === teamId) {
        updatedScore = match.team2Score + increment;
        await queryAsync('UPDATE matches SET team2Score = ? WHERE matchId = ?', [updatedScore, matchId]);
      } else {
        return { success: false, message: 'Invalid team ID for this match.' }
      }
  
      return {
        success: true,
        message: 'Score updated successfully.',
        matchId,
        teamId,
        updatedScore
      }
    } catch (error) {
        console.error("Error fetching matches:", error);
        return { success: 0, message: error.message };
    }
  },

  gameStatus:async(data) =>{
    const { matchId, status } = data;
 
    if (!matchId || !status) {
        return { success: 0, message: "matchId and status are required" }
    }

    try {
        const result = await queryAsync(
            "UPDATE matches SET status = ? WHERE matchId = ?",
            [status, matchId]
        );

        if (result.affectedRows === 0) {
            return { success: 0, message: "Match not found" }
        }

        return { success: 1, message: "Game status updated successfully" }
    } catch (error) {
        console.error("Error updating game status:", error);
        return { success: 0, message: "Failed to update game status" }
    }
  }
};
