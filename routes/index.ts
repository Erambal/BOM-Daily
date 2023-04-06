// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router();

router.use('/user', require('./user'));
router.use('/scriptures', require('./scripture'));
router.use('/settings', require('./settings'));
router.use('/user-favorites', require('./user_favorites'));

module.exports = router;