var fs = require ('fs');
var exec = require('child_process').exec;

var child = exec("mkdir /etc/httpd/conf.d/test", function(err, stdout, stderr){
	console.log("Error:",err);
	console.log("stdout:",stdout);
	console.log("stderr:",stderr);
});
