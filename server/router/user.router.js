const multer = require('multer');
const { Registration, Login } = require('../controller/user/user.controller');

const router = require('express').Router();

router.post('/registration', multer().none(), Registration)
router.post('/login', multer().none(), Login)

module.exports = router