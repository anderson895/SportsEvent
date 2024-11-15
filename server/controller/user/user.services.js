const {
  hashPassword,
  comparePassword,
} = require("../../helpers/hashCompare.js");
const pool = require("../../middleware/db.js");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  userRegistration: async (data) => {
    try {
      let {
        username,
        password,
        collegeName,
        type,
        teamId,
        status,
        sportEventId,
      } = data;
      password = await hashPassword(data.password);
      await queryAsync(
        "INSERT into users(username, password, collegeName, type, teamId, status, sportEventId) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [username, password, collegeName, type, teamId, status, sportEventId]
      );
      return { success: 1, message: "Account created" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  userLogin: async (data) => {
    try {
      const { username, password } = data;
      const res = await queryAsync("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      if (res.length === 0) {
        return { success: 0, message: "No user found" };
      }
      const isMatch = await comparePassword(password, res[0].password);
      if (!isMatch) {
        return { success: 0, message: "Invalid username or password" };
      }
      delete res[0].password;
      return { success: 1, results: res[0], message: "Login successfully" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  fetchUserList: async () => {
    try {
      const users = await queryAsync(
        "SELECT id, username, collegeName, type, teamId, status, sportEventId FROM users"
      );
      return { success: 1, results: users };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  updateUser: async (data) => {
    try {
      const {
        username,
        password,
        collegeName,
        type,
        teamId,
        status,
        sportEventId,
        id
      } = data;

      let hashedPassword = password ? await hashPassword(password) : null;
      const query = hashedPassword
        ? "UPDATE users SET username = ?, password = ?, collegeName = ?, type = ?, teamId = ?, status = ?, sportEventId = ? WHERE id = ?"
        : "UPDATE users SET username = ?, collegeName = ?, type = ?, teamId = ?, status = ?, sportEventId = ? WHERE id = ?";

      const params = hashedPassword
        ? [
            username,
            hashedPassword,
            collegeName,
            type,
            teamId,
            status,
            sportEventId,
            id,
          ]
        : [username, collegeName, type, teamId, status, sportEventId, id];

      const result = await queryAsync(query, params);
      if (result.affectedRows === 0) {
        return { success: 0, message: "User not found or no changes made" };
      }
      return { success: 1, message: "User updated successfully" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },
};
