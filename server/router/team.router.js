const multer = require('multer');
const { AddTeam, TeamsList, EditTeam, DeleteTeam } = require('../controller/teams/teams.controller');
const upload = multer();

const router = require('express').Router();

router.get('/list', multer().none(), TeamsList)
router.post('/add',upload.single("teamLogo"), AddTeam)
router.put('/edit/:teamId?', upload.single("teamLogo"), EditTeam)
router.delete('/delete/:teamId?', multer().none(), DeleteTeam)

module.exports = router