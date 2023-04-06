const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settings');

router.get('/', settingsController.getAll);

router.get('/:id', settingsController.getSingle);

router.post('/', settingsController.createSetting);

router.put('/:id', settingsController.updateSetting);

router.delete('/:id', settingsController.deleteSetting);

module.exports = router;