var express = require('express');
var router = express.Router();
var rooms = require('../service').rooms;

router.get('/', rooms.list);
router.get('/:id', rooms.findById);
router.post('/', rooms.create);
router.delete('/:id', rooms.delete);
router.put('/:id', rooms.update);
module.exports = router;