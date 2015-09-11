var fs = require ('fs');
var exec = require('child_process').exec;
var http = require('http');
var url = require('url');
var requestHandler = require('./requestHandler.js');

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
handle["/"] = requestHandler.default_route;
handle["/start"] = requestHandler.default_route;
handle["/upload"] = requestHandler.upload;
handle["/router.js"] = requestHandler.router;
handle["/app"] = requestHandler.app_html;
handle["/vhost-list"] = requestHandler.vhost_list;
//handle["/favicon"] = favicon;

startServer(route, handle);