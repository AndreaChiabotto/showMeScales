// Created by Andrea Chiabotto
// All Rights Deserved

// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

    "use strict";

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // ===========================================================================
        // LINTER FOR JS FILES  ======================================================
        // ===========================================================================
        jshint: {
            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js',
                'src/js/**.*',
                'src/js/select/**.*']
        },

        // ===========================================================================
        // ALL JS IN ONE FILE  =======================================================
        // ===========================================================================
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'src/js/Notes.js',
                    'src/js/Instrument.js',
                    'src/js/showMeScalesApp.js',
                    'src/js/Select.js',
                    'src/js/dragInstrument.js'
                ],
                dest: 'dist/js/app.min.js'
            }
        },

        // ===========================================================================
        // JS MINIFIER AFTER VALIDATION  =============================================
        // ===========================================================================
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/app.min.js': ['src/js/*.js']
                }
            }
        },

        // ===========================================================================
        // LINTER FOR SASS FILES  ====================================================
        // ===========================================================================
        stylelint: {
            simple: {
                options: {
                    configFile: 'config/.stylelintrc.json'
                },
                src: ['src/scss/*.scss',
                    'src/scss/instruments/*.scss']
            }
        },

        // ===========================================================================
        // TRANSFORM FROM SASS TO CSS FILES  =========================================
        // ===========================================================================
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'dist/css/style.css': 'src/scss/style.scss'
                }
            }
        },

        // ===========================================================================
        // CSS MINIFIER AFTER VALIDATION  ============================================
        // ===========================================================================
        cssmin: {
            options: {
                banner:'/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['src/css/style.css']
                }
            }
        },

        // ===========================================================================
        // WATCHER FOR CHANGES IN FILES  =============================================
        // ===========================================================================
        watch: {
            stylesheets: {
                files: ['src/scss/**.*',
                        'src/scss/instruments/**.*'],
                tasks: ['stylelint',
                        'sass'
                    /*, 'cssmin'*/]
            },
            // for scripts, run jshint and uglify
            scripts: {
                files: ['src/js/**.*',
                        'src/js/select/**.*'],
                tasks: ['jshint', 'concat']
            }
        },

        // ===========================================================================
        // BROWSERSYNC FOR FASTER DEVELOPMENT  =======================================
        // ===========================================================================
        browserSync: {
            bsFiles: {
                src: ['dist/css/*.css',
                      'dist/js/*.js',
                      'index.html']
            },
            options: {
                watchTask: true,
                port: 3000,
                server: {
                    baseDir: ""
                }
            }
        }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-stylelint');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');


    // ===========================================================================
    // TASK GRUNT ================================================================
    // ===========================================================================

    grunt.registerTask('default',
        ['jshint',
            //'uglify',
            'concat',
            'stylelint',
            'sass',
            //'cssmin',
            'browserSync',
            'watch'
        ]);

};
