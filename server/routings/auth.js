var express = require('express');
var AuthController = require('../controllers/AuthController');

router = express.Router();

router.post('/', AuthController.auth);
router.post('/add', AuthController.addUser);

module.exports = router;