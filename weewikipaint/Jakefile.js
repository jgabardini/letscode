/* global desc, task, jake, fail, complete */
/* jslint node: true */

(function() {
    "use strict";

    desc("Build and test");
    task("default", ["lint", "test"]);

    desc("Lint everything");
    task("lint", ["node"], function() {
        var lint= require("./build/lint/lint_runner.js");

        var files = new jake.FileList();
        files.include("**/*.js");
        files.exclude("node_modules");
        files.exclude("build/lint");
        console.log(files.toArray());

        var passed = lint.validateFile(files.toArray()[0], nodeLintOptions, {});
        if (!passed) fail("Lint Fail");
    });

    desc("test everithing");
    task("test", ["node"], function() {
        var reporter = require("nodeunit").reporters["default"]; //minimal;
        reporter.run(["src/server/_server_test.js"], null, function(failures){
            if (failures) fail("tests failed");
            complete();
        });
    }, {async:true});

    desc("Integration");
    task("integration", ["default"], function() {
        console.log("1. Make sure 'git status' is clean");
        console.log("2. Build on the integration box");
        console.log("   a. Walk over the integration box");
        console.log("   b. 'git pull'");
        console.log("   c. 'jake'");
        console.log("   d. if build fail, start over.");
        console.log("3. 'git checkout integration'");
        console.log("4. 'git merge master --no-ff --log'");
        console.log("5. 'git checkout master'");
    });

    // desc("Ensure that node version is present");
    task("node", [], function() {
        var NODE_VERSION = "v0.10.12\n";

        sh("node --version", function(stdout) {
            console.log(stdout);
            if (stdout !== NODE_VERSION) fail("Incorrect node version. Expected " + NODE_VERSION + "!=" + stdout);
            complete();
        });
    }, {async: true});

    function sh(command, callback) {
        console.log("> " + command);

        var stdout = "";
        var process = jake.createExec(command, {printStdout:true, printStderr: true});
        process.on("stdout", function(chunk) {
            stdout += chunk;
        });
        process.on("cmdEnd", function() {
            callback(stdout);
        });
        process.run();
    }

    function nodeLintOptions() {
        return  {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            noempty: true,  
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true,
            node: true
        };
    }
}());