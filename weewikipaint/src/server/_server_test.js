"use strict";

var server = require("./server.js");
var http = require("http");
var fs = require("fs");

var TEST_FILE = "generated/test/test.html";

exports.tearDown = function (done) {
	if (fs.existsSync(TEST_FILE))
		fs.unlinkSync(TEST_FILE);
	done();
};

exports.testRequiresPortNumber = function(test) {
	test.throws(function() {
		server.start(TEST_FILE);
	});
	test.done();
};

exports.testSererRequieresFileToServe = function(test) {
	test.throws(function() {
		server.start();
	});
	test.done();		
};

exports.testServerRunCallbackWhenStopCompetes = function(test) {
	server.start(TEST_FILE, 8080);
	server.stop(function(){
		test.done();
	});
};

exports.testStopCalledWhenServerIsntRunningthrowsException = function(test) {
	server.start(TEST_FILE, 8080);
	server.stop();
	test.throws(function() {
		server.stop();
	});
	test.done();		
};

exports.testServerServesAFile = function(test) {
	var testDir = "generated/test";
	var testFile = testDir +"/test.html";
	var testData = "un texto de prueba";

	fs.writeFileSync(testFile, testData);
	server.start(TEST_FILE, 8080);
	var request = http.get("http://localhost:8080/");
	request.on("response", function(response) {
		var receiveData = false;
		response.setEncoding('utf8');
		test.equals(200, response.statusCode, "status code OK");
		response.on("data", function(chunck){
			receiveData = true;
			test.equals(testData, chunck, "received text");
		});
		response.on("end", function() {
			test.ok(receiveData, "should have receiveData");
			server.stop(function () {
				test.done();
			});
		});
	});
};