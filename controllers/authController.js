exports.getLogin=(request, response, next)=>{
    response.render('auth/login',{
        pageTitle: 'Login',
        path: '/login',
        //isAuthenticated:request.isLogedIn
    });
};

exports.postLogout=(request, response, next)=>{
    request.session.destroy(()=>{
        response.redirect('/');
    });
};

exports.postLogin=(request, response, next)=>{
    request.session.asz=true;
    response.redirect('/');
};