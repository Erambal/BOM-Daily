const router = require('express').Router();
//const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));
router.use('/user', require('./users'));

module.exports = router;