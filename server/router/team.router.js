const multer = require('multer');
const { AddTeam, TeamsList, EditTeam, DeleteTeam, CoachList, AddPlayerInTeam, DeletePlayer, TeamInfo } = require('../controller/teams/teams.controller');
const upload = multer();

const router = require('express').Router();

router.get('/list', multer().none(), TeamsList)
router.get('/coach-list', multer().none(), CoachList)
router.post('/add',upload.single("teamLogo"), AddTeam)
router.post('/add-player',upload.single("medicalCertificate"), AddPlayerInTeam)
router.put('/edit/:teamId?', upload.single("teamLogo"), EditTeam)
router.delete('/delete/:teamId?', multer().none(), DeleteTeam)
router.get('/info/:teamId?', multer().none(), TeamInfo)
router.delete('/delete-player/:playerId?', multer().none(), DeletePlayer)

module.exports = router