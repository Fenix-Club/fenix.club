var express = require('express');
var AuthController = require('../controllers/AuthController');

router = express.Router();

router.post('/', AuthController.auth);
router.post('/add', AuthController.addUser);
router.get('/me', AuthController.me);
router.post('/logout', AuthController.logout);

module.exports = router;