const express = require('express');
const router = express.Router();
const scripture = require('../controllers/scripture');

// router.get('/:array', scripture.getScriptures);
router.get('/:id', scripture.getScripture);
router.post('/', scripture.createScripture);
router.put('/:id', scripture.updateScripture);
// router.delete('/:array', scripture.deleteScriptures);
router.delete('/:id', scripture.deleteScripture);

module.exports = router;