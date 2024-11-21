const util = require("util");
const pool = require("../middleware/db");
const queryAsync = util.promisify(pool.query).bind(pool);

const checkUniqueField = async (tableName, fieldName, value, currentValue = null) => {
  try {

    if (currentValue !== null && currentValue === value) {
      return true;
    }

    const query = `SELECT COUNT(*) AS count FROM ?? WHERE ?? = ?`;
    const result = await queryAsync(query, [tableName, fieldName, value]);
  
    const isUnique = result[0].count === 0;

    if (!isUnique) {
      throw new Error(`${value} already exists in ${tableName}`);
    }
    return true;
  } catch (error) {
    throw new Error(error.message || "Internal Server Error");
  }
};

module.exports = {
  checkUniqueField
};
