exports.get404 =(req,resp)=>{
    resp.status(404).render('404',{
        pageTitle : "Page not found",
        path: '/404'
    });
};