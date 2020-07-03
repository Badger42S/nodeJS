exports.get404 =(request,response)=>{
    response.status(404).render('404',{
        pageTitle : "Page not found",
        path: '/404',
        isAuthenticated: request.session.isLoggedIn
    });
};

exports.get500 =(request,response)=>{
    response.status(500).render('500',{
        pageTitle : "Wrong issue",
        path: '/500',
        isAuthenticated: request.session.isLoggedIn
    });
};