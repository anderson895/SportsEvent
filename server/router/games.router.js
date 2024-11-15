const multer = require('multer');
const { MatchSchedule, MatchById, IncrementScore, GameStatus } = require('../controller/games/games.controller');

const router = require('express').Router();

router.get('/schedule', multer().none(), MatchSchedule)
router.get('/match/:matchId?', multer().none(), MatchById)
router.post('/increment-score', multer().none(), IncrementScore)
router.post('/status', multer().none(), GameStatus)

module.exports = router