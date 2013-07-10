"use strict";

var http = require("http");
var fs = require("fs");

var server;

server = http.createServer();

server.on("request", function(request, response) {
	fs.readFile('./file.html', function(err,data){
		if (err) throw err;
        // response.writeHeader(200, {"Content-Type": "text/html"});
		// response.write(data);
		response.end(data);
	});
	// var body = "<http><head><title>Spike HTTP server</title</head>" +
	// 	"<body><p><Ejemplo de server HTTP usando node.js/p></body></http>";
	// response.end(body);
});
server.listen(8080);	
