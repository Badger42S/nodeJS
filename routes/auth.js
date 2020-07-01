const express = require('express');

const authController=require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/password-reset', authController.getResetPassword);

router.get('/reset/:token', authController.getNewPassword);

router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/password-reset', authController.postResetPassword);

router.post('/new-password', authController.postNewPassword);

module.exports=router;