const { MediaList, UploadMedia, DeleteMedia } = require("../controller/media/media.controller")
const multer = require('multer');
const verifyToken = require("../middleware/verifyToken");
const upload = multer();

const router = require('express').Router();

router.get('/list', multer().none(), MediaList)
router.post('/add',upload.single("media"),verifyToken, UploadMedia)
router.delete('/delete-media/:mediaId?', multer().none(),verifyToken, DeleteMedia)

module.exports = router