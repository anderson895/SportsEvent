const multer = require('multer');
const { SportsList, AddSports, EditSports, DeleteSports ,EventSummary} = require('../controller/sports/sports.controller');
const verifyToken = require('../middleware/verifyToken');
const upload = multer();

const router = require('express').Router();

router.get('/list', multer().none(), SportsList)
router.get('/summary', multer().none(), EventSummary)
router.post('/add',upload.single("sportsLogo"),verifyToken, AddSports)
router.put('/edit/:sportsId?', upload.single("sportsLogo"),verifyToken, EditSports)
router.delete('/delete/:sportsId?', multer().none(),verifyToken, DeleteSports)

module.exports = router