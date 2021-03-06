module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('tasks');


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

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    env: process.env
  };

  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  // grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('default', ['concurrent']);

};
