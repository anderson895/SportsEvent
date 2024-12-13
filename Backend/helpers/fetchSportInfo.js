const util = require("util");
const pool = require("../middleware/db");
const queryAsync = util.promisify(pool.query).bind(pool);

const getSportsEventsWithDetails = async (sportsEvents) => {
    return Promise.all(
        sportsEvents.map(async (sportsEvent) => {
            const sportInfo = await fetchSportInfo(sportsEvent.sportsId);
            const teams = await fetchTeamsForSportEvent(sportsEvent.sportEventsId);
            const matches = await fetchMatchesList(sportsEvent.sportEventsId)
            return {
                ...sportsEvent,
                sportInfo,
                teams,
                matches
            };
        })
    );
};

const fetchSportInfo = async (sportsId) => {
    const sportInfo = await queryAsync("SELECT * FROM sports WHERE sportsId = ?", [sportsId]);
    return sportInfo.length ? sportInfo[0] : null;
};
const fetchMatchesList = async (sportEventsId) => {
    const matches = await queryAsync("SELECT * FROM matches WHERE sportEventsId = ?", [sportEventsId]);
    return Promise.all(
        matches.map(async (match) => {
            const team1Info = await queryAsync("SELECT * FROM teams_events WHERE teamId = ?", [match.team1Id]);
            const team2Info = await queryAsync("SELECT * FROM teams_events WHERE teamId = ?", [match.team2Id]);

            return {
                ...match,
                team1: team1Info.length ? { teamName: team1Info[0].teamName, teamLogo: team1Info[0].teamLogo } : null,
                team2: team2Info.length ? { teamName: team2Info[0].teamName, teamLogo: team2Info[0].teamLogo } : null,
            };
        })
    );
};
const fetchTeamsForSportEvent = async (sportEventsId) => {
    const teamsEvents = await queryAsync("SELECT * FROM teams_events WHERE sportEventsId = ?", [sportEventsId]);
    return Promise.all(
        teamsEvents.map(async (teamEvent) => {
            const teamInfo = await queryAsync("SELECT * FROM teams WHERE teamId = ?", [teamEvent.teamId]);
            const info = teamInfo.length ? teamInfo[0] : null;
            return {
                ...teamEvent,
                teamLogo: info.teamLogo
            }
        })
    ).then((teams) => teams.filter(Boolean)); 
};

module.exports = {
    fetchSportInfo,
    fetchTeamsForSportEvent,
    getSportsEventsWithDetails
  }