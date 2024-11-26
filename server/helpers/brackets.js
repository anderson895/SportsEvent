const db = require("../middleware/db");
const util = require("util");
const pool = require("../middleware/db");
const queryAsync = util.promisify(pool.query).bind(pool);

exports.generateMatches = async (req, res) => {
  const { eventId } = req.params;
  let { bracketType, firstRoundMatches } = req.body;

  try {
    switch (bracketType) {
      case "Single Elimination":
        await generateSingleEliminationMatches(eventId, firstRoundMatches);
        break;
      case "Double Elimination":
        await generateDoubleEliminationMatches(eventId, firstRoundMatches);
        break;
      case "Round Robin":
        await generateRoundRobinMatches(eventId, firstRoundMatches);
        break;
      default:
        return res.status(400).json({ error: "Invalid bracket type" });
    }

    res.json({ message: `${bracketType} matches generated successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateSingleEliminationMatches = async (
  sportEventsId,
  firstRoundMatches,
  sportsId
) => {
  const bracketQuery =
    "INSERT INTO brackets (sportsId, bracketType, isElimination) VALUES (?, ?, ?)";
  const matchQuery =
    "INSERT INTO matches (sportEventsId, bracketId, round, team1Id, team2Id, status, schedule, next_match_id, isFinal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const [bracketResult] = await db
    .promise()
    .query(bracketQuery, [sportsId, "Single Elimination Bracket", true]);
  const bracket_id = bracketResult.insertId;

  let currentRoundMatchIds = [];

  for (const match of firstRoundMatches) {
    const { team1Id, team2Id, date } = match;
    const [matchResult] = await db
      .promise()
      .query(matchQuery, [
        sportEventsId,
        bracket_id,
        1,
        team1Id,
        team2Id,
        "Pending",
        date,
        null,
        0,
      ]);
    currentRoundMatchIds.push(matchResult.insertId);
  }

  let round = 2;

  while (currentRoundMatchIds.length > 1) {
    const nextRoundMatchIds = [];

    for (let i = 0; i < currentRoundMatchIds.length; i += 2) {
      const team1MatchId = currentRoundMatchIds[i];
      const team2MatchId = currentRoundMatchIds[i + 1] || null;

      const [nextMatchResult] = await db
        .promise()
        .query(matchQuery, [
          sportEventsId,
          bracket_id,
          round,
          null,
          null,
          "Pending",
          null,
          null,
          0,
        ]);
      const nextMatchId = nextMatchResult.insertId;
      nextRoundMatchIds.push(nextMatchId);

      await db
        .promise()
        .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
          nextMatchId,
          team1MatchId,
        ]);
      if (team2MatchId) {
        await db
          .promise()
          .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
            nextMatchId,
            team2MatchId,
          ]);
      }
    }

    currentRoundMatchIds = nextRoundMatchIds;
    round++;
  }

  if (currentRoundMatchIds.length === 1) {
    await db
      .promise()
      .query("UPDATE matches SET isFinal = 1 WHERE matchId = ?", [
        currentRoundMatchIds[0],
      ]);
  }
};

const generateDoubleEliminationMatches = async (sportEventsId, firstRoundMatches,sportsId) => {
  const bracketQuery =
    "INSERT INTO brackets (sportsId, bracketType, isElimination) VALUES (?, ?, ?)";
  const matchQuery =
    "INSERT INTO matches (sportEventsId, bracketId, round, team1Id, team2Id, status, schedule, next_match_id, loser_next_match_id, isFinal, bracketType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const [winnerBracketResult] = await db
    .promise()
    .query(bracketQuery, [sportsId, "Winner Bracket", true]);
  const [loserBracketResult] = await db
    .promise()
    .query(bracketQuery, [sportsId, "Loser Bracket", true]);
  const [finalRematchBracketResult] = await db
    .promise()
    .query(bracketQuery, [sportsId, "Final Rematch", true]);

  const winner_bracket_id = winnerBracketResult.insertId;
  const loser_bracket_id = loserBracketResult.insertId;
  const final_rematch_bracket_id = finalRematchBracketResult.insertId;

  let currentWinnerRoundMatchIds = [];

  for (const match of firstRoundMatches) {
    const { team1Id, team2Id, date } = match;
    const [matchResult] = await db
      .promise()
      .query(matchQuery, [
        sportEventsId,
        winner_bracket_id,
        1, 
        team1Id,
        team2Id,
        "Pending",
        date,
        null,
        null,
        0,
        "winners",
      ]);
    currentWinnerRoundMatchIds.push(matchResult.insertId);
  }

  const nextWinnerRoundMatchIds = [];
  const loserRound1MatchIds = [];

  for (let i = 0; i < currentWinnerRoundMatchIds.length; i += 2) {
    const team1MatchId = currentWinnerRoundMatchIds[i];
    const team2MatchId = currentWinnerRoundMatchIds[i + 1];

    const [nextMatchResult] = await db
      .promise()
      .query(matchQuery, [
        sportEventsId,
        winner_bracket_id,
        2, 
        null,
        null,
        "Pending",
        null,
        null,
        null,
        0,
        "winners",
      ]);
    const nextMatchId = nextMatchResult.insertId;
    nextWinnerRoundMatchIds.push(nextMatchId);

    await db
      .promise()
      .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
        nextMatchId,
        team1MatchId,
      ]);
    await db
      .promise()
      .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
        nextMatchId,
        team2MatchId,
      ]);

    const [loserMatchResult] = await db
      .promise()
      .query(matchQuery, [
        sportEventsId,
        loser_bracket_id,
        1, 
        null,
        null,
        "Pending",
        null,
        null,
        null,
        0,
        "losers",
      ]);
    const loserMatchId = loserMatchResult.insertId;
    loserRound1MatchIds.push(loserMatchId);

    await db
      .promise()
      .query("UPDATE matches SET loser_next_match_id = ? WHERE matchId = ?", [
        loserMatchId,
        team1MatchId,
      ]);
    await db
      .promise()
      .query("UPDATE matches SET loser_next_match_id = ? WHERE matchId = ?", [
        loserMatchId,
        team2MatchId,
      ]);
  }

  currentWinnerRoundMatchIds = nextWinnerRoundMatchIds;

  const [finalWinnerMatchResult] = await db
    .promise()
    .query(matchQuery, [
      sportEventsId,
      winner_bracket_id,
      3,
      null,
      null,
      "Pending",
      null,
      null,
      null,
      0,
      "winners",
    ]);
  const finalWinnerMatchId = finalWinnerMatchResult.insertId;

  for (const matchId of currentWinnerRoundMatchIds) {
    await db
      .promise()
      .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
        finalWinnerMatchId,
        matchId,
      ]);
  }
  const loserRound2MatchIds = [];

  for (let i = 0; i < loserRound1MatchIds.length; i++) {
    const [loserMatchResult] = await db
      .promise()
      .query(matchQuery, [
        sportEventsId,
        loser_bracket_id,
        2, 
        null,
        null,
        "Pending",
        null,
        null,
        null,
        0,
        "losers",
      ]);
    const loserRound2MatchId = loserMatchResult.insertId;
    loserRound2MatchIds.push(loserRound2MatchId);

    await db
      .promise()
      .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
        loserRound2MatchId,
        loserRound1MatchIds[i],
      ]);

    await db
      .promise()
      .query("UPDATE matches SET loser_next_match_id = ? WHERE matchId = ?", [
        loserRound2MatchId,
        currentWinnerRoundMatchIds[i],
      ]);
  }

  const [loserRound3MatchResult] = await db
    .promise()
    .query(matchQuery, [
      sportEventsId,
      loser_bracket_id,
      3, 
      null,
      null,
      "Pending",
      null,
      null,
      null,
      0,
      "losers",
    ]);
  const loserRound3MatchId = loserRound3MatchResult.insertId;

  for (const matchId of loserRound2MatchIds) {
    await db
      .promise()
      .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
        loserRound3MatchId,
        matchId,
      ]);
  }

  const [loserRound4MatchResult] = await db
    .promise()
    .query(matchQuery, [
      sportEventsId,
      loser_bracket_id,
      4, 
      null,
      null,
      "Pending",
      null,
      null,
      null,
      0,
      "losers",
    ]);
  const loserRound4MatchId = loserRound4MatchResult.insertId;

  await db
    .promise()
    .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
      loserRound4MatchId,
      loserRound3MatchId,
    ]);

  await db
    .promise()
    .query("UPDATE matches SET loser_next_match_id = ? WHERE matchId = ?", [
      loserRound4MatchId,
      finalWinnerMatchId,
    ]);
    const [firstFinalMatchResult] = await db
    .promise()
    .query(matchQuery, [
      sportEventsId,
      winner_bracket_id, 
      5,
      null, 
      null, 
      "Pending",
      null, 
      null,
      null, 
      1, 
      "final",
    ]);
  const firstFinalMatchId = firstFinalMatchResult.insertId;
  
  await db
    .promise()
    .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
      firstFinalMatchId,
      finalWinnerMatchId, 
    ]);
  await db
    .promise()
    .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
      firstFinalMatchId,
      loserRound4MatchId, 
    ]);
  
  const [resetMatchResult] = await db
    .promise()
    .query(matchQuery, [
      sportEventsId,
      final_rematch_bracket_id,
      6, 
      null,
      null, 
      "Pending",
      null, 
      null, 
      null, 
      1, 
      "final_rematch", 
    ]);
  const resetMatchId = resetMatchResult.insertId;
  
  await db
    .promise()
    .query("UPDATE matches SET next_match_id = ? WHERE matchId = ?", [
      resetMatchId,
      firstFinalMatchId,
    ]);
};


const generateRoundRobinMatches = async (sportEventsId, teams,sportsId) => {

  const bracketQuery =
    "INSERT INTO brackets (sportsId, bracketType, isElimination) VALUES (?, ?, ?)";
  const matchQuery =
    "INSERT INTO matches (sportEventsId, bracketId, round, team1Id, team2Id, status, schedule) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const [bracketResult] = await db
    .promise()
    .query(bracketQuery, [sportsId, "Round Robin Bracket", false]);
  const bracket_id = bracketResult.insertId;

  const numTeams = teams.length;
  const numRounds = numTeams - 1;
  const matchesPerRound = numTeams / 2;

  let schedule = [];

  for (let round = 0; round < numRounds; round++) {
    let roundMatches = [];
    for (let match = 0; match < matchesPerRound; match++) {
      const team1Index = (round + match) % (numTeams - 1);
      const team2Index = (numTeams - 1 - match + round) % (numTeams - 1);

      if (match === 0) {
        roundMatches.push([teams[0].teamId, teams[team2Index + 1].teamId]);
      } else {
        roundMatches.push([
          teams[team1Index + 1].teamId,
          teams[team2Index + 1].teamId,
        ]);
      }
    }
    schedule.push(roundMatches);
  }

  for (let round = 0; round < numRounds; round++) {
    for (const [team1Id, team2Id] of schedule[round]) {
      await db
        .promise()
        .query(matchQuery, [
          sportEventsId,
          bracket_id,
          round + 1,
          team1Id,
          team2Id,
          "Pending",
          null,
        ]);
    }
  }
};

const advanceWinnerToNextMatch = async (winnerId, nextMatchId) => {
  try {
    const nextMatch = await queryAsync(
      "SELECT * FROM matches WHERE matchId = ?",
      [nextMatchId]
    );
    if (nextMatch.length === 0) {
      throw new Error("Next match not found");
    }

    const nextMatchRecord = nextMatch[0];
    const { team1Id, team2Id, next_match_id } = nextMatchRecord;
    const updateField = team1Id ? "team2Id" : "team1Id";

    await queryAsync(
      `UPDATE matches SET ${updateField} = ? WHERE matchId = ?`,
      [winnerId, nextMatchId]
    );

    if (next_match_id) {
      await advanceWinnerToNextMatch(winnerId, next_match_id);
    }
  } catch (error) {
    console.error("Error advancing winner to next match:", error);
  }
};

async function setTeamInNextMatch(matchId, teamId,stat) {
  if (!teamId) {
    console.error("Invalid teamId provided:", teamId);
    return;
  }

  try {
    const match = await queryAsync("SELECT team1Id, team2Id FROM matches WHERE matchId = ?", [matchId]);

    if (match.length === 0) {
      console.error(`Match with matchId ${matchId} not found.`);
      return;
    }

    const { team1Id, team2Id } = match[0];
    
    let updateField;
    let statistics;
    if (team1Id === null || team1Id === 0) {
      updateField = "team1Id";
      statistics = "team1stat";
    } else if (team2Id === null || team2Id === 0) {
      updateField = "team2Id";
      statistics = "team2stat";
    } else {
      console.error(
        `Both team1Id(${team1Id}) and team2Id(${team2Id}) are already set for matchId ${matchId}.`
      );
      return; 
    }

    const res = await queryAsync(`UPDATE matches SET ${updateField} = ?, ${statistics} = ? WHERE matchId = ?`, [
        teamId,
        stat,
        matchId,
      ]);

    console.log(
      `Successfully updated ${updateField} in match ${matchId} with teamId ${teamId}.${res}`
    );
  } catch (error) {
    console.error("Error in setTeamInNextMatch:", error);
  }
}


async function checkForChampion(winnerTeamId, loserTeamId, match) {
  const matchQuery = `
  INSERT INTO matches (
    sportEventsId, 
    bracketId, 
    round, 
    team1Id, 
    team2Id, 
    status, 
    schedule, 
    next_match_id, 
    loser_next_match_id, 
    isFinal, 
    bracketType
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  if (match.isFinal && match.bracketType === "final") {
    console.log('checking')
    if (loserTeamId && ((match.team1stat === "winnerBracket" && match.team1Id === loserTeamId) ||
    (match.team2stat === "winnerBracket" && match.team2Id === loserTeamId))) {
      const [existingResetMatch] = await db
      .promise()
      .query(
        "SELECT * FROM matches WHERE isFinal = 1 AND bracketType = 'final_rematch' AND matchId = ?",
        [match.next_match_id]
      );
    

      if (existingResetMatch.length > 0) {

        const resetMatch = existingResetMatch[0];
        if (
          (match.team1stat === "winnerBracket" && match.team1Id === loserTeamId) ||
          (match.team2stat === "winnerBracket" && match.team2Id === loserTeamId)
        ) {
          console.log('here',loserTeamId)
          await db.promise().query(
            "UPDATE matches SET team2Id = ? WHERE matchId = ?",
            [loserTeamId, resetMatch.matchId]
          );
          console.log(
            `Updated team2Id in reset match (ID: ${resetMatch.matchId}) with team from Winner Bracket.`
          );
        }
      } else {
        const [resetMatchResult] = await db.promise().query(matchQuery, [
          match.sportEventsId, 
          6, 
          match.round + 1, 
          loserTeamId,
          winnerTeamId, 
          "Pending", 
          null, 
          null, 
          null,
          1,
          "final_rematch", 
        ]);

        const resetMatchId = resetMatchResult.insertId;

        await db
          .promise()
          .query(
            "UPDATE matches SET loser_next_match_id = ? WHERE matchId = ?",
            [resetMatchId, match.matchId]
          );

        console.log(`Reset match created with ID: ${resetMatchId}`);
      }
    } else {
      return winnerTeamId; 
    }
  }

  if (match.isFinal && match.bracketType === "final_rematch") {
    return winnerTeamId;
  }

  return null; 
}

const updateTeamStanding = async (winnerTeamId, loserTeamId) => {
  try {
    await db
    .promise()
    .query(
      "UPDATE teams_events SET teamWin = teamWin + 1 WHERE teamId = ?",
      [winnerTeamId]
    );

    await db
    .promise()
    .query(
      "UPDATE teams_events SET teamLose = teamLose + 1 WHERE teamId = ?",
      [loserTeamId]
    );
  } catch (error) {
    console.error("Error updating team standings:", error);
    throw new Error("Failed to update team standings");
  }
};


module.exports = {
  generateDoubleEliminationMatches,
  generateSingleEliminationMatches,
  generateRoundRobinMatches,
  setTeamInNextMatch,
  checkForChampion,
  updateTeamStanding
};
