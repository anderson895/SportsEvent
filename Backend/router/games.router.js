const multer = require('multer');
const { MatchSchedule, MatchById, IncrementScore, GameStatus } = require('../controller/games/games.controller');
const verifyToken = require('../middleware/verifyToken');

const router = require('express').Router();

router.get('/schedule', multer().none(), MatchSchedule)
router.get('/match/:matchId?', multer().none(), MatchById)
router.post('/increment-score', multer().none(),verifyToken, IncrementScore)
router.post('/status', multer().none(),verifyToken, GameStatus)

module.exports = router