const multer = require('multer');
const { EventLists, AddEvents, EditEvents, DeleteEvent } = require('../controller/events/events.router');
const router = require('express').Router();

router.get('/list', multer().none(), EventLists)
router.post('/add',multer().none(), AddEvents)
router.put('/edit/:eventId?', multer().none(), EditEvents)
router.delete('/delete/:eventId?', multer().none(), DeleteEvent)

module.exports = router