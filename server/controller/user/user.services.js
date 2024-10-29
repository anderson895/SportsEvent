const { hashPassword, comparePassword } = require("../../helpers/hashCompare.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  userRegistration: async (data) => {
    try {
      let { username, password, collegeName } = data;
      password = await hashPassword(data.password);
      await queryAsync(
        "INSERT into users(username,password,collegeName)values(?,?,?)",
        [username, password, collegeName]
      );
      return { success: 1, message: "Account created" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },
  userLogin: async(data) =>{
    try {
        const { username, password } = data
        const res = await queryAsync("select * from users where username = ?",[username])
        if (res.length === 0) {
            return { success: 0, message: "No user founds" };
          }
          const isMatch =await comparePassword(password, res[0].password);
          if (!isMatch) {
            return { success: 0, message: "Invalid email or password" };
          }
          delete res[0].password
          return { success: 1, results: res[0],message:'Login Successfully' };
    } catch (error) {
        return { success: 0, message: error.message };
    }
  }
};
