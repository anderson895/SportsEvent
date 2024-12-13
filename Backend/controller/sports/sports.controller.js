const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { createSports, fetchSports, editSports, deleteSports, fetchAllData } = require("./sports.services");

module.exports = {
    AddSports:(req,res) =>{
        try {
            let data = req.body;
            const file = req.file;
            data.sportsLogo = file;
            handleResponse(res, createSports(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    SportsList:(req,res) =>{
        try {
            handleResponse(res,fetchSports())
        } catch (error) {
            errorException(error,res)
        }
    },
    EventSummary:(req,res) =>{
        try {
            handleResponse(res,fetchAllData())
        } catch (error) {
            errorException(error,res)
        }
    },
    EditSports:(req,res) =>{
        try {
            const data = req.body;
            if(req.file){
            const file = req.file;
            data.sportsLogo = file;
            }
            handleResponse(res, editSports(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    DeleteSports:(req,res) =>{
        try {
            const data = req.params.sportsId;
            handleResponse(res, deleteSports(data))
        } catch (error) {
            errorException(error,res)
        }
    },
}