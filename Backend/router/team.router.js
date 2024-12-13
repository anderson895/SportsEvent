const multer = require('multer');
const { AddTeam, TeamsList, EditTeam, DeleteTeam, CoachList, AddPlayerInTeam, DeletePlayer, TeamInfo } = require('../controller/teams/teams.controller');
const verifyToken = require('../middleware/verifyToken');
const upload = multer();

const router = require('express').Router();

router.get('/list', multer().none(), TeamsList)
router.get('/coach-list', multer().none(), CoachList)
router.post('/add',upload.single("teamLogo"),verifyToken, AddTeam)
router.post('/add-player',upload.single("medicalCertificate"),verifyToken, AddPlayerInTeam)
router.put('/edit/:teamId?', upload.single("teamLogo"),verifyToken, EditTeam)
router.delete('/delete/:teamId?', multer().none(),verifyToken, DeleteTeam)
router.get('/info/:teamId?', multer().none(), TeamInfo)
router.delete('/delete-player/:playerId?', multer().none(),verifyToken, DeletePlayer)

module.exports = router