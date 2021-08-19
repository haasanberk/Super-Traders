var express = require('express');
var router = express.Router();
var cont = require('../controllers/buyController');
const { user, share } = require('../models');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await user.findAll({ include: { model: share } }));
});

module.exports = router;
