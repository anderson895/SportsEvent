const multer = require('multer');
const { EventLists, AddEvents, EditEvents, DeleteEvent, EventInfo, SportsEvents, CreateMatch, BracketMatches, SingleSetScore, SetMatchSchedule, DoubleSetScore, RoundRobinSetScore, SportsEventsListed } = require('../controller/events/events.controller');
const verifyToken = require('../middleware/verifyToken');
const router = require('express').Router();

router.get('/list', multer().none(), EventLists)
router.get('/sports-events', multer().none(), SportsEventsListed)
router.post('/add',multer().none(),verifyToken, AddEvents)
router.post('/single/set-winner',multer().none(),verifyToken, SingleSetScore)
router.post('/double/set-winner',multer().none(),verifyToken, DoubleSetScore)
router.post('/round-robin/set-winner',multer().none(),verifyToken, RoundRobinSetScore)
router.post('/set-schedule',multer().none(),verifyToken, SetMatchSchedule)
router.post('/create-match',multer().none(),verifyToken, CreateMatch)
router.post('/sportsEvent',multer().none(),verifyToken, SportsEvents)
router.get('/information/:eventId?', multer().none(), EventInfo)
router.get('/bracket-match/:sportEventsId?', multer().none(), BracketMatches)
router.put('/edit/:eventId?', multer().none(),verifyToken, EditEvents)
router.delete('/delete/:eventId?', multer().none(),verifyToken, DeleteEvent)

module.exports = router