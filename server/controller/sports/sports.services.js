const { checkUniqueField } = require("../../helpers/checkUniqueness.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const { uploadImage, deleteImageByURL } = require("../../middleware/utils.js");
const { checkIfExists } = require("../../helpers/checkIfExist.js");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  // Create a new team
  createSports: async (data) => {
    try {
      const { sportsName, sportsLogo, description } = data;
      await checkUniqueField('sports', 'sportsName', sportsName);
      const imageUrl = await uploadImage(sportsLogo, sportsLogo.originalname);
      await queryAsync(
        "INSERT INTO sports (sportsName, sportsLogo, description) VALUES (?, ?, ?)",
        [sportsName, imageUrl, description]
      );
      return {
        success: 1,
        message: "New Sport added successfully",
      };
    } catch (error) {
        console.log(error)
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  // Fetch all teams
  fetchSports: async () => {
    try {
      const sportLists = await queryAsync("SELECT * FROM sports");
      return {
        success: 1,
        results: sportLists,
        message: "Fetched successfully",
      };
    } catch (error) {
      console.log(error)
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  // Edit a team by ID
  editSports: async (data) => {
    try {
      let { sportsName, sportsLogo, description, sportsId } = data;
      const existingData = await checkIfExists('sports', 'sportsId', sportsId)
      await checkUniqueField('sports', 'sportsName', sportsName, existingData.sportsName);
      let imageUrl = sportsLogo;
      if (typeof sportsLogo !== "string") {
        imageUrl = await uploadImage(sportsLogo, sportsLogo.originalname, existingData.sportsLogo); 
      }
      await queryAsync(
        "UPDATE sports SET sportsName = ?, sportsLogo = ?, description = ? WHERE sportsId = ?",
        [sportsName, imageUrl, description, sportsId]
      );
  
      return {
        success: 1,
        message: "Team updated successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },

  // Delete a team by ID
  deleteSports: async (id) => {
    try {
      const existingData = await checkIfExists('sports', 'sportsId', id)
      if(existingData.sportsLogo){
        await deleteImageByURL(existingData.sportsLogo)
      }
      await queryAsync("DELETE FROM sports WHERE sportsId = ?", [id]);
      return {
        success: 1,
        message: "Sports deleted successfully",
      };
    } catch (error) {
      return { success: 0, message: error.message || "Internal Server Error" };
    }
  },
};
