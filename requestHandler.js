var fs = require ('fs');
var db = require ('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'tools_app',
            password: 't00LsApp',
            database: 'web_tools',
            port: '3306'
        }
    });

function webAsset(response, name, mime){
    var stream = fs.createReadStream('web/'+name);
    response.writeHead(200, {"Content-Type": mime});
    stream.pipe(response);
}

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
    response.writeHead(200, {"Content-Type": "text/html"});
    stream.pipe(response);
}
function router(response){
    webAsset(response, "router.js", "text/javascript");
}
function loadingGif(response){
    var stream = fs.createReadStream('web/loading.gif');
    response.writeHead(200, {"Content-Type": "image/gif"});
    stream.pipe(response);
}
function vhost_list(response, postData){
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.sringify(db('web_host')));
    response.end();
}

exports.default_route = default_route;
exports.upload = upload;
exports.app_html = app_html;
exports.router = router;
exports.loadingGif = loadingGif;
exports.vhost_list = vhost_list;