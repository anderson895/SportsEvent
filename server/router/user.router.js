const multer = require('multer');
const { Registration, Login, UserList, UpdateUser, CoachManagement } = require('../controller/user/user.controller');

const router = require('express').Router();

router.post('/registration', multer().none(), Registration)
router.post('/login', multer().none(), Login)
router.get('/list', multer().none(), UserList)
router.post('/update', multer().none(), UpdateUser)
router.get('/coach/:coachId', multer().none(), CoachManagement)

module.exports = router