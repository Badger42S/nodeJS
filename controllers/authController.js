const crypt =require('bcryptjs');

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
    });
};

exports.postSignup=(request, response, next)=>{
    const email = request.body.email;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    userModel.findOne({email: email})
        .then(findedUser=>{
            if(findedUser){
                return response.redirect('/signup');
            }
            return crypt.hash(password, 12).then(hashedPass=>{
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
        })
        .catch(err=>console.log(err));
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