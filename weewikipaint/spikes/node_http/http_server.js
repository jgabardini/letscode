"use strict";

var http = require("http");

var server = http.createServer();

server.on("request", function(request, response) {
	console.log("Received request");
	var body = "<http><head><title>Spike HTTP server</title</head>" +
		"<body><p><Ejemplo de server HTTP usando node.js/p></body></http>"
	response.end(body);
});

server.listen(8080);

console.log("Server started");
