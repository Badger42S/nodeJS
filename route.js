function listener(req, resp){
    console.log(req.url, req.method);
    resp.setHeader('Content-Type', 'text/html');
    resp.write('<html>');
    resp.write('<body><h1>Tessst</h1></body>');
    resp.write('</html>');
    resp.end();
};

module.exports=listener;