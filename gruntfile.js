// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

module.exports = function (grunt) {
    var config = require("./config.js");

    // Helper function to load the config file
    function loadConfig(path) {
      var glob = require('glob');
      var object = {};
      var key;

      glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
      });

      return object;
    }

    // Load task options
    var gruntConfig = loadConfig('./tasks/options/');

    // Package data
    gruntConfig.pkg = grunt.file.readJSON("package.json");

    // Project config
    grunt.initConfig(gruntConfig);

    // Load all grunt-tasks in package.json
    require("load-grunt-tasks")(grunt);

    // Register external tasks
    grunt.loadTasks("tasks/");

    // Task alias's
    grunt.registerTask("default", ["clean", "less", "concat", "copy", "replace", "bom"]);
    grunt.registerTask("css", ["less", "bom"]);
    grunt.registerTask("base", ["clean:base", "concat:baseDesktop", "concat:basePhone", "concat:baseStringsDesktop", "concat:baseStringsPhone", "replace", "bom"]);
    grunt.registerTask("ui", ["clean:ui", "concat:uiDesktop", "concat:uiPhone", "concat:uiStringsDesktop", "concat:uiStringsPhone", "replace", "less", "bom"]);
}