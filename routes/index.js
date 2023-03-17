// const router = require('express').Router();
// //const router = express.Router();

// router.use('/', require('./swagger'));
// router.use('/contacts', require('./contacts'));
// router.use('/user', require('./users'));
// router.use('/settings', require('./settings'))

// module.exports = router;

const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/scripture', require('./scripture'));
router.use('/settings', require('./settings'));

module.exports = router;