module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/es5-shim/es5-shim.js',
      'node_modules/jasmine-as-promised/src/jasmine-as-promised.js',

      // karma-browserify-preprocessor doesn't appear to play well angular as a CommonJS module so we just include it here
      'node_modules/angular/angular.js',

      'node_modules/q/q.js',

      'scripts/**/*.js',

      // karma-browserify-preprocessor requires dependencies to be loaded before the tests
      'test/spec/utils.js',

      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    // exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
     'PhantomJS'
      // 'Chrome'
    ],

    // Code coverage report
    reporters: ['progress', 'coverage'],  
    preprocessors: {  
      'scripts/**/*.js': ['coverage', 'browserify'],
      'test/spec/**/*.js': ['browserify']
    },
    coverageReporter: {  
      // type: 'html',
      type: 'lcov',
      // type: 'cobertura',
      dir: 'coverage',
      subdir: function(browser) {
        // normalization process to keep a consistent browser name accross different
        // OS
        return browser.toLowerCase().split(/[ /-]/)[0];
      }
    },

    browserify: {
      debug: true,
      external: [
        'underscore'
      ]
    },

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      // 'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-browserify-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    // browserNoActivityTimeout: 100000
  });
};
