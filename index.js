var fs = require ('fs');
var exec = require('child_process').exec;
var http = require('http');
var url = require('url')

/*var child = exec("mkdir /etc/httpd/conf.d/test", function(err, stdout, stderr){
	console.log("Error:",err);
	console.log("stdout:",stdout);
	console.log("stderr:",stderr);
});*/

//var handler = new Object();
function startServer(route, handle) {
  function onRequest(request, response) {
        var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    request.setEncoding("utf8");

        request.addListener("data", function(postDataChunk) {
                postData += postDataChunk;
                console.log("Received POST data chunk '"+
                postDataChunk + "'.");
        });

        request.addListener("end", function() {
                route(handle, pathname, response, postData);
        });
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
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

function route(handle, pathname, response, postData){
        console.log("about to route a request for "+pathname);
        if (typeof handle[pathname] === 'function'){
                handle[pathname](response, postData);
        }else{
                console.log("No request handler found for "+pathname);
                response.writeHead(404, {"Content-Type" : "text/plain"});
                response.write("404 Not Found");
                response.end();
        }
}

var handle = {};
handle["/"] = default_route;
handle["/start"] = default_route;
handle["/upload"] = upload;

server.startServer(router.route, handle);