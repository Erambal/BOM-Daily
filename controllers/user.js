//Req's
const router = require('express').Router();
const useControl = require('../controllers/user');

//routes
//-------------------------------------- user
router.get('/', useControl.getAllUsers)
router.post('/', useControl.postUser);
router.put('/', useControl.putUser);

//-------------------------------------- userId
router.get('/:id', useControl.getUserId);
router.put('/:id', useControl.putUser);
router.delete('/:id', useControl.deleteUserId);

//-------------------------------------- userName
router.get('/userprofile/:username', useControl.getUsername);
router.put('/userprofile/:username', useControl.putUsername);
router.delete('/userprofile/:username', useControl.deleteUsername);

//-------------------------------------- imageUpload
router.post('/userprofile/:id/uploadImage', useControl.putUser);


//-------------------------------------- login - OAuth


//exports
module.exports = router;
