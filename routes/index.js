const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'))
router.use('/settings', require('./settings'))

module.exports = router;