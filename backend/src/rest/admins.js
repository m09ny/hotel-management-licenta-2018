var express = require('express');
var router = express.Router();
var admins = require('../service').admins;

router.get('/', admins.list);
router.get('/:id', admins.findById);
router.post('/login', admins.login);
router.post('/', admins.create);
router.delete('/:id', admins.delete);
module.exports = router;
