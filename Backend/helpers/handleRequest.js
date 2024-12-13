const { errorException } = require("./errorException");
const { handleResponse } = require("./handleResponse");

const handleRequest = (serviceFunction) => async (req, res) => {
    try {
        const data = req.params || req.body;
        handleResponse(res,serviceFunction(data));
    } catch (error) {
        errorException(error, res);
    }
};


module.exports = {
    handleRequest
}