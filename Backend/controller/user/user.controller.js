const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { userRegistration, userLogin, updateUser, fetchUserList, coachHandle } = require("./user.services");

module.exports = {
  Registration: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, userRegistration(data));
    } catch (error) {
      return errorException(error, res);
    }
  },
  Login: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, userLogin(data));
    } catch (error) {
      return errorException(error, res);
    }
  },
  UserList: (req, res) => {
    try {
      handleResponse(res, fetchUserList());
    } catch (error) {
      return errorException(error, res);
    }
  },
  UpdateUser: (req, res) => {
    try {
      const data = req.body;
      handleResponse(res, updateUser(data));
    } catch (error) {
      return errorException(error, res);
    }
  },
  CoachManagement:(req,res) =>{
    try {
      const data = req.params.coachId;
      handleResponse(res, coachHandle(data));
    } catch (error) {
      return errorException(error, res);
    }
  }
};
