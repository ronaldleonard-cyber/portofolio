const express = require('express');
const router = express.Router();
const ContactCtrl = require('../controller/contactController');

router.get('/', ContactCtrl.getAll);
router.get('/:id', ContactCtrl.getById);
router.post('/', ContactCtrl.create);
router.delete('/:id', ContactCtrl.remove);

module.exports = router;