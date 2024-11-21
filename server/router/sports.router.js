const multer = require('multer');
const { SportsList, AddSports, EditSports, DeleteSports ,EventSummary} = require('../controller/sports/sports.controller');
const upload = multer();

const router = require('express').Router();

router.get('/list', multer().none(), SportsList)
router.get('/summary', multer().none(), EventSummary)
router.post('/add',upload.single("sportsLogo"), AddSports)
router.put('/edit/:sportsId?', upload.single("sportsLogo"), EditSports)
router.delete('/delete/:sportsId?', multer().none(), DeleteSports)

module.exports = router