//Req's
// @ts-ignore
const router = require('express').Router();
// @ts-ignore
const useControl = require('../controllers/user');
// @ts-ignore
const { requiresAuth } = require('express-openid-connect');
// @ts-ignore
const val = require('../middleware/userVal');

//routes
//-------------------------------------- user
router.get('/', requiresAuth(), useControl.getAllUsers)
router.post('/', requiresAuth(), val.valUser, useControl.postUser);
router.put('/', requiresAuth(),  val.valUser, useControl.putUser);

//-------------------------------------- userId
router.get('/:id', requiresAuth(), useControl.getUserId);
router.put('/:id', requiresAuth(),  val.valUser, useControl.putUser);
router.delete('/:id', requiresAuth(), useControl.deleteUserId);

//-------------------------------------- userName
router.get('/userprofile/:username', requiresAuth(), useControl.getUsername);
router.put('/userprofile/:username', requiresAuth(), useControl.putUsername);
router.delete('/userprofile/:username', requiresAuth(), useControl.deleteUsername);

//-------------------------------------- imageUpload
router.post('/userprofile/:id/uploadImage', requiresAuth(), useControl.putUser);


//-------------------------------------- login - OAuth


//exports
module.exports = router;

