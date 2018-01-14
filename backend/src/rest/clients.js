var express = require('express');
var router = express.Router();
var clients = require('../service/').clients;

router.get('/', clients.list);
router.get('/:id', clients.findById);
router.post('/', clients.create);
router.delete('/:id', clients.delete);
router.put('/:id', clients.update);
module.exports = router;