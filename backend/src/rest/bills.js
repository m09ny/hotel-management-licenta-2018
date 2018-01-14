var express = require('express');
var router = express.Router();
var bills = require('../service').bills;

router.get('/', bills.list);
router.get('/:id', bills.findById);
router.post('/', bills.create);
router.delete('/:id', bills.delete);
router.put('/:id', bills.update);
module.exports = router;