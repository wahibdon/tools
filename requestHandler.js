

function default_route(response, postData){
        console.log("Request handler 'start' was called.");
        var body =      '<html>'+
                                '<head>'+
                                '<meta http-equiv="Content-Type" content="text/html; '+
                                'charset=UTF-8" />'+
                                '</head>'+
                                '<body>'+
                                '<form action="/upload" method="post">'+
                                '<textarea name="text" rows="20" cols="60"></textarea>'+
                                '<input type="submit" value="Submit text" />'+
                                '</form>'+
                                '</body>'+
                                '</html>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
}
function upload(response, postData){
    console.log("Request handler 'upload' was called");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent: " + postData);
    response.end();
}
function app_html(response){
    var stream = fs.createReadStream('web/index.html');
    response.pipe(stream);
    response.end(); 
}
function router(response){
    var stream = fs.createReadStream('web/router.js');
    response.pipe(stream);
    response.end();
}

exports.default_route = default_route;
exports.upload = upload;
exports.app_html = app_html;
exports.router = router;