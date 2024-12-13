const multer = require('multer');
const { Registration, Login, UserList, UpdateUser, CoachManagement } = require('../controller/user/user.controller');
const verifyToken = require('../middleware/verifyToken');

const router = require('express').Router();

router.post('/registration', multer().none(),verifyToken, Registration)
router.post('/login', multer().none(), Login)
router.get('/list', multer().none(), UserList)
router.post('/update', multer().none(),verifyToken, UpdateUser)
router.get('/coach/:coachId', multer().none(), CoachManagement)

module.exports = router