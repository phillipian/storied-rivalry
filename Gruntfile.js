module.exports = function(grunt) {
    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // copy from the source directory to build
        copy: {
          build: {
            cwd: 'source',
            src: [ '**', '!**/*.pug', '!sass', '!sass/*', '!**/*.scss', '!partials', '!partials/*', '!includes/*' ],
            dest: 'build',
            expand: true
          }
        },
        // clean the build directory
        clean: {
          build: {
            src: [ 'build' ]
          }
        },
        watch: {
          sass: {
            files: [ 'source/sass/*.scss', 'source/sass/*/*.scss' ],
            tasks: [ 'sass' ]
          },
          pug: {
            files: 'source/**/*.pug',
            tasks: [ 'pug' ]
          },
          copy: {
            files: [ 'source/**', '!source/**/*.scss', '!source/*.pug' ],
            tasks: [ 'copy' ]
          }
        },
        pug: {
          compile: {
            options: {
              data: {}
            },
            files: [{
              expand: true,
              cwd: 'source',
              src: [ '**/*.pug' ],
              dest: 'build',
              ext: '.html'
            }]
          }
        },
        sass: {
          dist: {
            files: [{
              expand: true,
              cwd: 'source/sass',
              src: [ '*.scss' ],
              dest: 'build/assets/styles',
              ext: '.css'
            }]
          }
        },
        connect: {
          server: {
            options: {
              port: 4000,
              base: 'build',
              hostname: '*'
            }
          }
        }
    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // define the tasks

    grunt.registerTask(
      'build',
      // [ 'clean', 'copy', 'pug', 'sass' ]
      [ 'copy', 'pug', 'sass' ]
    );

    grunt.registerTask(
      'default',
      ['build', 'connect', 'watch']
    );
};
