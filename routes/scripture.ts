// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router();
const scripture = require('../controllers/scripture');
// @ts-ignore
const val = require('../middleware/scripture-val');

router.get('/', scripture.getScriptures);

router.get('/:id', scripture.getScriptureById);

router.post('/', val.validateScripture, scripture.createScripture);

router.put('/:id', val.validateScripture, scripture.updateScripture);

router.delete('/:id', scripture.deleteScripture);

module.exports = router;