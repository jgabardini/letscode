"use strict";

var server = require("./server.js");
var http = require("http");

exports.tearDown = function (done) {
	server.stop(function() {
		console.log("tearDown");
		done();
	});
};
//TODO: manejar el caso que llamo a stopt antes que start
//TODO: test-drven stop callback

exports.testServerReturnHelloWorld = function(test) {
	server.start(8080);
	var request = http.get("http://localhost:8080/");
	request.on("response", function(response) {
		var receiveData = false;
		response.setEncoding('utf8');
		test.equals(200, response.statusCode, "status code OK");
		response.on("data", function(chunck){
			receiveData = true;
			test.equals("Hello World", chunck, "received text");
		})
		response.on("end", function(){
			test.ok(receiveData, "should have receiveData");
			test.done();
		});
	});
};
