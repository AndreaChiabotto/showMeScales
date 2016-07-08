// Created by Andrea Chiabotto
// All Rights Deserved

// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        // configure jshint to validate js files ---------------------------------
        jshint: {
            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Gruntfile.js',
                'src/js/**.*',
                'src/js/select/**.*']
        },


        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'src/js/Notes.js',
                    'src/js/Instrument.js',
                    'src/js/showMeScalesApp.js',
                    'src/js/Select.js',
                    // 'src/js/scroll.js',
                ],
                dest: 'dist/js/app.min.js',
            },
        },


        // configure uglify to minify js files -----------------------------------
        //uglify: {
        //    options: {
        //        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        //    },
        //   build: {
        //        files: {
        //            'dist/js/app.min.js':['src/js/*.js']
        //        }
        //    }
        //} ,


        // configure scsslint to validate scss files -----------------------------
        scsslint: {
            allFiles: [
                'src/scss/**.*', 'src/scss/instruments/**.*'
            ],
            options: {
                colorizeOutput: true,
                quiet: true,
                NestingDepth: {
                    enabled: true,
                    max_depth: 5,
                    ignore_parent_selectors: false
                }
            }
        },


        // configure compass to transform sscss files into css -------------------
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'dist/css/style.css': 'src/scss/style.scss'
                }
            }
        },


        // configure cssmin to minify css files ---------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['src/css/style.css', 'src/css/animsition.min.css']
                }
            }
        },


        watch: {
            // for stylesheets, watch css and less files
            stylesheets: {
                files: ['src/scss/**.*', 'src/scss/instruments/**.*'],
                tasks: ['scsslint', 'sass'/*, 'cssmin'*/]
            },
            // for scripts, run jshint and uglify
            scripts: {
                files: ['src/js/**.*',
                    'src/js/select/**.*'],
                tasks: ['jshint', 'concat']
            }
        },


        browserSync: {
            bsFiles: {
                src: ['dist/css/*.css',
                    'dist/js/*.js',
                    'dist/index.html']
            },
            options: {
                watchTask: true,
                port: 3000,
                server: {
                    baseDir: "dist/"
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
    grunt.loadNpmTasks('grunt-scss-lint');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');


    // ===========================================================================
    // TASK GRUNT ================================================================
    // ===========================================================================


    grunt.registerTask('default', ['jshint',
        // 'uglify',
        'concat',
        'scsslint',
        'sass',
        'cssmin',
        'browserSync',
        'watch'
    ]);

};
