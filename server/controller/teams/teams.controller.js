const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { createTeams, fetchTeams, editTeam, deleteTeam } = require("./teams.services");


module.exports = {
    AddTeam:(req,res) =>{
        try {
            let data = req.body;
            const file = req.file;
            data.teamLogo = file;
            handleResponse(res, createTeams(data))
        } catch (error) {
            console.log(error)
            errorException(error,res)
        }
    },
    TeamsList:(req,res) =>{
        try {
            handleResponse(res,fetchTeams())
        } catch (error) {
            errorException(error,res)
        }
    },
    EditTeam:(req,res) =>{
        try {
            const data = req.body;
            if(req.file){
            const file = req.file;
            data.teamLogo = file;
            }
            handleResponse(res, editTeam(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    DeleteTeam:(req,res) =>{
        try {
            const data = req.params.teamId;
            handleResponse(res, deleteTeam(data))
        } catch (error) {
            errorException(error,res)
        }
    },
}