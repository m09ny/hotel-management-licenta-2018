var express = require('express');
var router = express.Router();
var users = require('../service').users;

router.get('/', users.list);
router.get('/:id', users.findById);
router.post('/', users.create);
router.delete('/:id', users.delete);
module.exports = router;
