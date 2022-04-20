const express= require('express');
const userController= require('../controllers/userController');
const router= express.Router();
router.post('/login',userController.login);
router.post('/playlist/songs/:sId',userController.addToList);
router.delete('/playlist/songs/:sId',userController.removeFromList);
router.get('/playlist/',userController.getPlaylist);

module.exports=router;