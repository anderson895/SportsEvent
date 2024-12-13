const util = require("util");
const pool = require("../middleware/db");
const queryAsync = util.promisify(pool.query).bind(pool);

const checkIfExists = async (tableName, fieldName, value) => {
    try {
      const query = `SELECT * FROM ?? WHERE ?? = ?`;
      const params = [tableName, fieldName, value];
  
      const result = await queryAsync(query, params);
      if (result.length === 0) {
        throw new Error(`${fieldName} with value '${value}' does not exist in table ${tableName}.`);
      }
  
      return result[0]; 
    } catch (error) {
      throw new Error(error.message || "Internal Server Error");
    }
  };

module.exports = {
    checkIfExists
  }