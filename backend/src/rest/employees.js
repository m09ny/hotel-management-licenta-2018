var express = require('express');
var router = express.Router();
var employees = require('../service/').employees;

router.get('/', employees.list);
router.get('/:id', employees.findById);
router.post('/', employees.create);
router.delete('/:id', employees.delete);
router.put('/:id', employees.update);
module.exports = router;