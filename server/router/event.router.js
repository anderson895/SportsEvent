const multer = require('multer');
const { EventLists, AddEvents, EditEvents, DeleteEvent, EventInfo, SportsEvents } = require('../controller/events/events.router');
const router = require('express').Router();

router.get('/list', multer().none(), EventLists)
router.post('/add',multer().none(), AddEvents)
router.post('/sportsEvent',multer().none(), SportsEvents)
router.get('/information/:eventId?', multer().none(), EventInfo)
router.put('/edit/:eventId?', multer().none(), EditEvents)
router.delete('/delete/:eventId?', multer().none(), DeleteEvent)

module.exports = router