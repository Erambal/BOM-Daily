<<<<<<< HEAD:routes/scripture.ts
const express = require('express');
const router = express.Router();
const scripture = require('../controllers/scripture');

router.get('/', scripture.getScriptures);
router.get('/:id', scripture.getScriptureById);
router.post('/', scripture.createScripture);
router.put('/:id', scripture.updateScripture);
// router.delete('/:array', scripture.deleteScriptures);
router.delete('/:id', scripture.deleteScripture);

=======
const express = require('express');
const router = express.Router();
const scripture = require('../controllers/scripture');
const val = require('../middleware/scripture-val');

router.get('/', scripture.getScriptures);

router.get('/:id', scripture.getScriptureById);

router.post('/', val.validateScripture, scripture.createScripture);

router.put('/:id', val.validateScripture, scripture.updateScripture);

router.delete('/:id', scripture.deleteScripture);

>>>>>>> 09e699591c9d807a049c43080471e7198ceeaa9f:routes/scripture.js
module.exports = router;