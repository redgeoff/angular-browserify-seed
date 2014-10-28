'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths
  var appConfig = {
    scripts: 'scripts',
    dist: 'dist',
    examples: 'examples'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    app: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= app.scripts %>/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= app.examples %>/{,*/}*.html'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect().use(
                '/dist',
                connect.static('./dist')
              ),
              connect().use( // for use w/o an Internet connection
                '/node_modules',
                connect.static('./node_modules')
              ),
              connect().use(
                '/coverage',
                connect.static('./coverage/phantomjs/lcov-report')
              ),
              connect.static(appConfig.examples)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.examples)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= app.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= app.scripts %>/{,*/}*.js'
        ]
      },
      examples: {
        src: [
          '<%= app.examples %>/{,*/}*.js',
          '!<%= app.examples %>/bundleall/hello-browserified.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.dist %>/{,*/}*',
            '!<%= app.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp',
      coverage: 'coverage/{,*/}*'
    },

    browserify: {
      foobar: {
        src: ['scripts/index.js'],
        dest: 'dist/foobar.js',
        options: {
          external: ['angular']
        }
      },
      hello: {
        // Need to include angular first so that window.angular can be used by hello.js
        src: ['node_modules/angular/angular.js', 'examples/bundleall/hello.js'],
        dest: 'examples/bundleall/hello-browserified.js'
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          src: '**/*.js',
          dest: '<%= app.dist %>',
          cwd: '<%= app.dist %>',
          rename: function(dest, src) { return dest + '/' + src.replace('.js', '.min.js'); }
        }]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    'code-coverage-enforcer': {
      options: {
        lcovfile: 'coverage/phantomjs/lcov.info',
        lines: 100,
        functions: 100,
        branches: 100,
        src: 'scripts',
        excludes: ['scripts/adapters/templatyng.js']
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'clean:coverage',
    'connect:test',
    'karma',
    'code-coverage-enforcer'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'browserify',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
