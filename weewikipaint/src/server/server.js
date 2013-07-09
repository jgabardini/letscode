"use strict";

var http = require("http");
var server;

exports.start = function () {
	server = http.createServer();

	server.on("request", function(request, response) {
		var body = "<http><head><title>Spike HTTP server</title</head>" +
			"<body><p><Ejemplo de server HTTP usando node.js/p></body></http>"
		response.end(body);
	});
	server.listen(8080);	//TODO: remove duplication 
}

exports.stop = function (callback) {
	server.close(callback);
}