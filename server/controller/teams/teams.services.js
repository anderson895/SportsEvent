const { checkUniqueField } = require("../../helpers/checkUniqueness.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const { uploadImage, deleteImageByURL } = require("../../middleware/utils.js");
const { checkIfExists } = require("../../helpers/checkIfExist.js");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  // Create a new team
  createTeams: async (data) => {
    try {
      const { teamName, teamCoach, teamLogo } = data;
      console.log(typeof teamLogo)
      await checkUniqueField('teams', 'teamName', teamName);
      const imageUrl = await uploadImage(teamLogo, teamLogo.originalname);
      await queryAsync(
        "INSERT INTO teams (teamName, teamLogo, teamCoach) VALUES (?, ?, ?)",
        [teamName, imageUrl, teamCoach]
      );
      const updatedTeams = await queryAsync("SELECT * FROM teams");
      return {
        success: 1,
        results: updatedTeams,
        message: "New Team added successfully",
      };
    } catch (error) {
        console.log(error)
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  // Fetch all teams
  fetchTeams: async () => {
    try {
      const teamLists = await queryAsync("SELECT * FROM teams");
      return {
        success: 1,
        results: teamLists,
        message: "Fetched successfully",
      };
    } catch (error) {
      console.log(error)
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  // Edit a team by ID
  editTeam: async (data) => {
    try {
      let { teamName, teamCoach, teamLogo, teamId } = data;
      const existingData = await checkIfExists('teams', 'teamId', teamId)
      await checkUniqueField('teams', 'teamName', teamName, existingData.teamName);
      let imageUrl = teamLogo;
      if (typeof teamLogo !== "string") {
        imageUrl = await uploadImage(teamLogo, teamLogo.originalname, existingData.teamLogo); 
      }
      await queryAsync(
        "UPDATE teams SET teamName = ?, teamLogo = ?, teamCoach = ? WHERE teamId = ?",
        [teamName, imageUrl, teamCoach, teamId]
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

  // Delete a team by ID
  deleteTeam: async (id) => {
    try {
      const existingData = await checkIfExists('teams', 'teamId', id)
      if(existingData.teamLogo){
        await deleteImageByURL(existingData.teamLogo)
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
};
