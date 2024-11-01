const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { userRegistration, userLogin } = require("./user.services");


module.exports = {
    Registration: (req,res) =>{
        try {
           const data = req.body;
           handleResponse(res, userRegistration(data))
        } catch (error) {
          return errorException(error,res)
        }
    },
    Login:(req,res) =>{
      try {
        const data = req.body;
        handleResponse(res, userLogin(data))
     } catch (error) {
       return errorException(error,res)
     } 
    }
}