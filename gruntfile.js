module.exports = function(grunt) {

  // Configure task(s)
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
  	

    // Add ability to include partials
    zetzer: {
      main: {
        options: {
          env: {
            title: "James Baker Web Development",
          },
          partials: "dev/partials",
          templates: "dev/templates",
          dot_template_settings: {
            strip: false // Stops minification of html
          }
        },
        files: [
          {
            expand: true,
            cwd: "dev/",
            src: ["**/*.html", "!partials/**/*.html"],
            dest: "dist/",
            ext: ".html",

          }
        ]
      },
    },

    // Minifies and concatenates js files
    uglify: {
  		dev: {
  			options: {
  				beautify: false,
  				mangle: false,
  				compress: false,
  				preserveComments: 'all'

  			},
        //src: ['dev/js/*.js', '!dev/js/jquery', '!dev/js/emailer'],
  			src: ['dev/js/includes/**/*.js','dev/js/*.js', '!dev/js/emailer'],
  			dest: 'dist/js/main.min.js'
  		},
      build: {
        src: ['dev/js/includes/**/*.js','dev/js/*.js', '!dev/js/emailer'],
        dest: 'dist/js/main.min.js'
      }
  	},

    // Compiles scss to css (Could be swapped out for compass plugin)
  	sass: {
  		dev: {
  			options: {
  				outputStyle: 'expanded'
  			},
  			files: {
  				'dist/css/main.css' : 'dev/sass/application.scss'
  			}
  		},
  		build: {
  			options: {
  				outputStyle: 'compressed'
  			},
  			files: {
  				'dist/css/main.css' : 'dev/sass/application.scss'
  			}
  		}
  	},
    
    // Copies fonts files across
    copy: {
      main: {
        files: [
          // flattens results to a single level 
          {expand: true, flatten: true, src: ['dev/fonts/**'], dest: 'dist/fonts/', filter: 'isFile'},
           // flattens results to a single level 
          {expand: true, flatten: true, src: ['dev/img/**'], dest: 'dist/img/', filter: 'isFile'},
        ],
      },
    },
    
    // Lints js files to check for errors
    jshint: {
      all: ['dev/**/*.js']
    },

    watch : {
      options: {
        reload: true, 
      }, 
      html: {
        files: ['dev/**/*.html'],
        tasks: ['zetzer'],
        options: {
          livereload: true
        }    
      },
      // jshint: {
      //   files: ['gruntfile.js','dev/js/*.js'],
      //   tasks: ['jshint'],
      //   options: {
      //     livereload: true
      //   }
      // },
      js: {
        files: ['dev/js/*.js'],
        tasks: ['uglify:build'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['dev/sass/**/*.scss'],
        tasks: ['sass:build'],
        options: {
          livereload: true
        }
      },
      dist: {
        files: ['dist/**/*'],
        options: {
          livereload: true
        }
      },
    },

    // Compiles png in specified folder to spritesheet and produces necessary
    // css for include into main scss file
    sprite:{
      all: {
        src: 'dev/img/icons/*.png',
        dest: 'dev/img/icons_sprite.png',
        destCss: 'dev/sass/_includes/_icons.scss'
      }
    },
    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "127.0.0.1",
          bases: "dist",
          livereload: true 
        }
      }
    },
 
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }

  });

  // Load the plugins  
  grunt.loadNpmTasks('grunt-spritesmith');      // 'sprite'
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');   // 'uglify:dev or uglify:build'
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-zetzer');
  grunt.loadNpmTasks('grunt-contrib-watch');    // 'watch'
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express');  
  grunt.loadNpmTasks('grunt-contrib-copy'); 
 
  
  
  // Register task(s)
  grunt.registerTask('default', ['zetzer', 'uglify:dev', 'sprite', 'sass:dev']);
  grunt.registerTask('build', ['zetzer', 'uglify:build', 'sprite', 'sass:build']);
  grunt.registerTask('server', ['express','open','express-keepalive']);
};