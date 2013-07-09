"use strict";

var http = require("http");
var server;

exports.start = function (portNumber) {
	if (!portNumber) throw "portNumber is requiered";
	
	server = http.createServer();

	server.on("request", function(request, response) {
		var body = "<http><head><title>Spike HTTP server</title</head>" +
			"<body><p><Ejemplo de server HTTP usando node.js/p></body></http>";
		response.end('Hello World');
	});
	server.listen(portNumber);	
}

exports.stop = function (callback) {
	server.close(callback);
}
