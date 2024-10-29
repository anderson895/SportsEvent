const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    try {
      const saltRounds = 10; // Cost factor
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  };
  
  // Function to compare a plain text password with a hashed password
  const comparePassword = async (plainTextPassword, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      console.error("Error comparing password:", error);
    }
  };

  module.exports ={
    hashPassword,
    comparePassword
  }