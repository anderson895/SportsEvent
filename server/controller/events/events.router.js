const { errorException } = require("../../helpers/errorException");
const { handleResponse } = require("../../helpers/handleResponse");
const { createEvents, fetchEvents, editEvent, deleteEvent, fetchEventById, addSportsEvents } = require("./events.services");


module.exports = {
    AddEvents:(req,res) =>{
        try {
            const data = req.body;
            handleResponse(res,createEvents(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    EventLists:(req,res) =>{
        try {
            handleResponse(res,fetchEvents())
        } catch (error) {
            errorException(error,res)
        }
    },
    EditEvents:(req,res) =>{
        try {
            const data = req.body;
            handleResponse(res,editEvent(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    DeleteEvent:(req,res) =>{
        try {
            const data = req.params.eventId;
            handleResponse(res,deleteEvent(data))
        } catch (error) {
            errorException(error,res)
        }
    },

    EventInfo:(req,res) =>{
        try {
            const data = req.params.eventId;
            handleResponse(res,fetchEventById(data))
        } catch (error) {
            errorException(error,res)
        }
    },
    SportsEvents:(req,res) =>{
        try {
            const data = req.body;
            handleResponse(res,addSportsEvents(data))
        } catch (error) {
            errorException(error,res)
        }
    }
}