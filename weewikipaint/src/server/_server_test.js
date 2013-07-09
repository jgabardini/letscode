"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function (done) {
	server.stop(function() {
		console.log("tearDown");
		done();
	});
	//TODO: manejar el caso que llamo a stopt antes que start
};
//TODO: test-drven stop callback
exports.testerverRespondsToGetrequests = function(test) {
	server.start();
	http.get("http://localhost:8080/", function(response) {
		response.on("data", function(){})
		test.done();
	});
};
