const {
  hashPassword,
  comparePassword,
} = require("../../helpers/hashCompare.js");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "i3jCXU67a9f8Ul-LW5THvDP1JqTTD9OmmeEiaiMdhH4yp2e6PHZicR1jRq8gY3sX5VXIeTyL2LhYbCAQDAhF5Q";
const pool = require("../../middleware/db.js");
const util = require("util");
const queryAsync = util.promisify(pool.query).bind(pool);

module.exports = {
  userRegistration: async (data) => {
    try {
      let {
        username,
        password,
        type,
        teamId,
        status,
        addedBy
      } = data;
      password = await hashPassword(data.password);
  
      await queryAsync(
        "INSERT INTO users(username, password, type, teamId, status,addedBy) VALUES (?, ?, ?, ?, ?,?)",
        [username, password, type, teamId, status,addedBy]
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
      let navigate = '';
      if(res[0].type === 'Coach'){
        navigate = '/Home'
      } else {
        navigate = '/Dashboard'
      }
      const tokenPayload = {
        id: res[0].id,
        username: res[0].username,
        type: res[0].type,
      };
      const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });
     
      return { success: 1, results: res[0], message: "Login successfully",navigate,token };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },

  fetchUserList: async () => {
    try {
      const users = await queryAsync(`
        SELECT 
          u.*, 
          addedByUser.username AS addedByUsername 
        FROM users u
        LEFT JOIN users addedByUser ON u.addedBy = addedByUser.id
        WHERE u.type != 'SuperAdmin'
      `);
  
      const detailedUsers = await Promise.all(
        users.map(async (user) => {
          if (user.type === "Coach") {
            const teamInfo = await queryAsync(
              `SELECT 
                t.teamId, 
                t.teamName,
                t.teamLogo, 
                t.dateAdded 
              FROM teams t 
              WHERE t.teamCoach = ?`,
              [user.id]
            );
  
            return {
              ...user,
              teamInfo: teamInfo[0],
            };
          } else {
            return user;
          }
        })
      );
  
      return { success: 1, results: detailedUsers };
    } catch (error) {
      console.error("Error fetching user list:", error);
      return { success: 0, message: error.message };
    }
  },
  
  
  updateUser: async (data) => {
    try {
      const { username, type, teamId, status, id, password } = data;
  
      // Base query and params
      let query = "UPDATE users SET username = ?, type = ?, teamId = ?, status = ?";
      let params = [username, type, teamId, status];
  
      // If a new password is provided, hash and add it to the query and params
      if (password && password.trim()) {
        const hashedPassword = await hashPassword(password);
        query += ", password = ?";
        params.push(hashedPassword);
      }
  
      query += " WHERE id = ?";
      params.push(id);
  
      const result = await queryAsync(query, params);
  
      if (result.affectedRows === 0) {
        return { success: 0, message: "User not found or no changes made" };
      }
  
      return { success: 1, message: "User updated successfully" };
    } catch (error) {
      return { success: 0, message: error.message };
    }
  },
  
  
  
  coachHandle: async (coachId) => {
    try {
      // Fetch the coach details
      const coachDetails = await queryAsync(
        `SELECT * FROM users 
         WHERE id = ? AND type = 'Coach'`,
        [coachId]
      );
  
      if (coachDetails.length === 0) {
        return { success: 0, message: 'Coach not found' };
      }
  
      const coach = coachDetails[0];
  
      const teamsEvents = await queryAsync(
        "SELECT * FROM teams_events WHERE coachId = ?",
        [coachId]
      );
      const sportEventsWithDetails = await Promise.all(
        teamsEvents.map(async (teamEvent) => {
          const sportEvent = await queryAsync(
            "SELECT * FROM sports_events WHERE sportEventsId = ?",
            [teamEvent.sportEventsId]
          );
  
          if (sportEvent.length === 0) return null;
  
          const sportEventDetails = sportEvent[0];
  
          const eventDetails = await queryAsync(
            "SELECT * FROM events WHERE eventId = ?",
            [sportEventDetails.eventsId]
          );
  
          const sportDetails = await queryAsync(
            "SELECT * FROM sports WHERE sportsId = ?",
            [sportEventDetails.sportsId]
          );
  
          const players = await queryAsync(
            "SELECT * FROM players WHERE teamEventId = ?",
            [teamEvent.teamEventId]
          );
      
          return {
            ...sportEventDetails,
            team: {
              teamId: teamEvent.teamId,
              teamName: teamEvent.teamName,
              teamCoach: teamEvent.teamCoach,
            },
            teamEvent:teamEvent,
            eventDetails: eventDetails[0] || null,
            sportDetails: sportDetails[0] || null,
            players,
          };
        })
      );
  
      const filteredSportEvents = sportEventsWithDetails.filter((event) => event !== null);
  
      return {
        success: 1,
        results:{
          coach,
          handledEvents: filteredSportEvents,
        }

      };
    } catch (error) {
      console.error('Error fetching coach details:', error);
      return { success: 0, message: 'Internal server error' };
    }
  }
  
  
};
