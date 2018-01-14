var express = require('express');
var router = express.Router();
var departments = require('../service').departments;

router.get('/', departments.list);
router.get('/:id', departments.findById);
router.post('/', departments.create);
router.delete('/:id', departments.delete);
router.put('/:id', departments.update);
module.exports = router;