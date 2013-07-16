"use strict";

var http = require("http");
var fs = require("fs");
var server;

exports.start = function (htmlFileToServer, portNumber) {
	if (!portNumber) throw "portNumber is requiered";
	
	server = http.createServer();

	server.on("request", function(request, response) {
		if (request.url === "/" || request.url === "/index.html" )	{
			fs.readFile(htmlFileToServer, function(err,data){
				if (err) throw err;
				response.end(data);
			});
		}
		else {		
			response.statusCode = 404;
			response.end();
		}

	});
	server.listen(portNumber);	
}

exports.stop = function (callback) {
	server.close(callback);
}
