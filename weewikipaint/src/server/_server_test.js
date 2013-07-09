"use strict";

var server = require("./server.js");
var http = require("http");

//TODO: manejar el caso que llamo a stopt antes que start

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
		response.on("end", function() {
			test.ok(receiveData, "should have receiveData");
			server.stop(function () {
				test.done();
			});
		});
	});
};

exports.testServerRunCallbackWhenStopCompetes = function(test) {
	server.start(8080);
	server.stop(function(){
		test.done();		
	});
}

exports.testStopCalledTwiceThrowsException = function(test) {
	server.start(8080);
	server.stop();
	test.throws(function() {
		server.stop();
	});
	test.done();		
}