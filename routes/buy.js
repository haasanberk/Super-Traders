var express = require('express');
var router = express.Router();
var cont = require('../controllers/buyController');
const { user, share } = require('../models');

router.get('/', cont.buyShare);

module.exports = router;
