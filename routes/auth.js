const express = require('express');
const {check, body}=require('express-validator/check');

const authController=require('../controllers/authController');
const userModel = require('../models/userModel');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/password-reset', authController.getResetPassword);

router.get('/reset/:token', authController.getNewPassword);

router.post('/signup', [
    check('email', 'Wrong value. Change it!')
        .isEmail()
        .normalizeEmail()
        .custom(value=>{
            return userModel.findOne({email: value})
                .then(findedUser=>{
                    if(findedUser){
                        return Promise.reject('We have this one allrady');
                    }
                })
        }),
    body('password', 'Too short/long password or not a number')
        .isLength({min:2, max:4})
        .isAlphanumeric()   
        .trim(),
    body('confirmPassword')
        .custom((value, {req})=>{         //look at taking request
            if(value !== req.body.password){
                throw new Error('Password and confirm password are different')
            }
            return true;
        })
        .trim()
    ], authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/password-reset', authController.postResetPassword);

router.post('/new-password', authController.postNewPassword);

module.exports=router;