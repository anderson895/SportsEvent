const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { createTeams, fetchTeams, editTeam, deleteTeam, fetchCoaches, addPlayer, deletePlayer, fethcTeamInfo, fetchTeamInfo } = require("./teams.services");


module.exports = {
    AddTeam:(req,res) =>{
        try {
            let data = req.body;
            const file = req.file;
            data.teamLogo = file;
            handleResponse(res, createTeams(data))
        } catch (error) {
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
    CoachList:(req,res) =>{
        try {
            handleResponse(res, fetchCoaches())
        } catch (error) {
            errorException(error,res)
        }
    },
    AddPlayerInTeam:(req,res) =>{
        try {
            const data = req.body;
            const file = req.file;
            data.medicalCertificate = file;
            handleResponse(res, addPlayer(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    DeletePlayer:(req,res) =>{
        try {
            const data = req.params.playerId;
            handleResponse(res, deletePlayer(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    TeamInfo:(req,res) =>{
        try {
            const data = req.params;
            handleResponse(res, fetchTeamInfo(data))
        } catch (error) {
            errorException(error,res)
        } 
    }
}