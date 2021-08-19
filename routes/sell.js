var express = require('express');
var router = express.Router();
var cont = require('../controllers/sellController');
const { user, share } = require('../models');

router.get('/', cont.sellShare);

module.exports = router;
