// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router();
const settingsController = require('../controllers/settings');
// @ts-ignore
const val = require('../middleware/settings-val');

router.get('/', settingsController.getAll);

router.get('/:id', settingsController.getSingle);

router.post('/', val.validateSetting, settingsController.createSetting);

router.put('/:id', val.validateSetting, settingsController.updateSetting);

router.delete('/:id', settingsController.deleteSetting);

module.exports = router;