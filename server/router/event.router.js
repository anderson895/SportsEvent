const multer = require('multer');
const { EventLists, AddEvents, EditEvents, DeleteEvent, EventInfo, SportsEvents, CreateMatch, BracketMatches, SingleSetScore, SetMatchSchedule, DoubleSetScore, RoundRobinSetScore, SportsEventsListed } = require('../controller/events/events.controller');
const router = require('express').Router();

router.get('/list', multer().none(), EventLists)
router.get('/sports-events', multer().none(), SportsEventsListed)
router.post('/add',multer().none(), AddEvents)
router.post('/single/set-winner',multer().none(), SingleSetScore)
router.post('/double/set-winner',multer().none(), DoubleSetScore)
router.post('/round-robin/set-winner',multer().none(), RoundRobinSetScore)
router.post('/set-schedule',multer().none(), SetMatchSchedule)
router.post('/create-match',multer().none(), CreateMatch)
router.post('/sportsEvent',multer().none(), SportsEvents)
router.get('/information/:eventId?', multer().none(), EventInfo)
router.get('/bracket-match/:sportEventsId?', multer().none(), BracketMatches)
router.put('/edit/:eventId?', multer().none(), EditEvents)
router.delete('/delete/:eventId?', multer().none(), DeleteEvent)

module.exports = router