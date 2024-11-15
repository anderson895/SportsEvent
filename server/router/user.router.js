const multer = require('multer');
const { Registration, Login, UserList, UpdateUser } = require('../controller/user/user.controller');

const router = require('express').Router();

router.post('/registration', multer().none(), Registration)
router.post('/login', multer().none(), Login)
router.get('/list', multer().none(), UserList)
router.post('/update', multer().none(), UpdateUser)

module.exports = router