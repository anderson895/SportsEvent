const { MediaList, UploadMedia, DeleteMedia } = require("../controller/media/media.controller")
const multer = require('multer');
const upload = multer();

const router = require('express').Router();

router.get('/list', multer().none(), MediaList)
router.post('/add',upload.single("media"), UploadMedia)
router.delete('/delete-media/:mediaId?', multer().none(), DeleteMedia)

module.exports = router