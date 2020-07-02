const crypt =require('bcryptjs');
const crypto=require('crypto');
const { validationResult } = require('express-validator/check');

const userModel = require("../models/userModel");

exports.getLogin=(request, response, next)=>{
    let errorMessage=request.flash('error');
    if(errorMessage.length>0){
        errorMessage= errorMessage[0];
    } else {
        errorMessage=null;
    }
    response.render('auth/login',{
        pageTitle: 'Login',
        path: '/login',
        errorMessage: errorMessage
    });
};

exports.getSignup=(request, response, next)=>{
    response.render('auth/signup',{
        pageTitle: 'Signup',
        path: '/signup',
        errorMessage: null
    });
};

exports.postSignup=(request, response, next)=>{
    const email = request.body.email;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    const errors= validationResult(request);
    if(!errors.isEmpty()){
        console.log(errors.array());
        return response.status(422)
            .render('auth/signup',{
                pageTitle: 'Signup',
                path: '/signup',
                errorMessage: errors.array()
            });
    }

    crypt.hash(password, 12).then(hashedPass=>{
            const user =new userModel({
                email: email,
                password: hashedPass,
                cart: {itemc:[]}
            });
            return user.save();
        })
        .then(()=>{
            response.redirect('/login')
        });

};

exports.postLogout=(request, response, next)=>{
    request.session.destroy(()=>{
        response.redirect('/');
    });
};

exports.postLogin=(request, response, next)=>{
    const email = request.body.email;
    const password = request.body.password;
    userModel.findOne({email: email})
        .then(user=>{
            if(!user){
                request.flash('error', 'Invalid email or password.');
                return response.redirect('/login');
            }
            crypt.compare(password, user.password)
                .then(match=>{
                    if(match){
                        request.session.isLoggedIn=true;
                        request.session.user=user;
                        return request.session.save(err=>
                            {
                                console.log(err);
                                response.redirect('/');
                            });
                    }
                    response.redirect('/login');
                })
                .catch(err=>{
                    console.log(err);
                    response.redirect('/login');
                });
        })
        .catch(err=>console.log(err));
};

exports.getResetPassword=(request, response, next)=>{
    let errorMessage=request.flash('error');
    if(errorMessage.length>0){
        errorMessage= errorMessage[0];
    } else {
        errorMessage=null;
    }
    response.render('auth/password-reset',{
        pageTitle: 'Reset Password',
        path: '/reset',
        errorMessage: errorMessage
    })
};

exports.postResetPassword=(request, response, next)=>{
    crypto.randomBytes(32, (err, buff)=>{
        if(err){
            console.log(err);
            return response.redirect('/reset');
        }
        const token=buff.toString('hex');
        userModel.findOne({email:request.body.email})
            .then(user=>{
                if(!user){
                    request.flash('error', 'No accaunt');
                    return response.redirect('/reset');
                }
                user.resetToken=token;
                user.resetTokenExperation= Date.now()+3600;
                return user.save();
            })
            .then(res=>{
                response.render('auth/reset-page',{
                    pageTitle: 'Reset page',
                    path: '/reset',
                    resetToken:token
                })
            })
            .catch(err=>console.log(err));
    })
};

exports.getNewPassword=(request, response, next)=>{
    const token=request.params.token;
    userModel.findOne({
        resetToken:token, 
        resetTokenExperation:{$gt:Date.now()}
    })
    .then(user=>{
        response.render('auth/new-password',{
            pageTitle: 'New password',
            path: '/new-password',
            userId:user._id,
            token:token
        })
    })
    .catch(err=>console.log(err));
};

exports.postNewPassword=(request, response, next)=>{
    const newPassword = request.body.password;
    const userId=request.body.userId;
    const passwordToken= request.body.token;
    let foundUser;
    userModel.findOne({
        resetToken:passwordToken, 
        _id:userId
       // resetTokenExperation:{$gt:Date.now()}
    })
    .then(user=>{
        foundUser=user;
        return crypt.hash(newPassword, 12)
    })
    .then(hashPass=>{
        foundUser.password=hashPass;
        foundUser.resetToken=undefined;
        foundUser.resetTokenExperation=undefined;
        return foundUser.save();
    })
    .then(res=>{
       response.redirect('/login'); 
    })
    .catch(err=>console.log(err));
};