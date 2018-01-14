var express = require('express');
var router = express.Router();
var accomodations = require('../service/').accomodations;

router.get('/', accomodations.list);
router.get('/:id', accomodations.findById);
router.post('/', accomodations.create);
router.delete('/:id', accomodations.delete);
router.put('/:id', accomodations.update);
module.exports = router;