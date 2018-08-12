const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/userController');


// CREATE USER WITH HASH PASSWORD
router.post('/signup', UserController.create_user );


// USER LOG IN
router.post('/login', UserController.login_user);

// DELETE USER
router.delete('/:userId', UserController.delete_user_by_id);


module.exports = router