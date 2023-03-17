const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

// router.get('/:array', user.getUsers);
router.get('/:id', user.getUser);
router.post('/', user.createUser);
router.put('/:id', user.updateUser);
// router.delete('/:array', user.deleteUsers);
router.delete('/:id', user.deleteUser);

module.exports = router;