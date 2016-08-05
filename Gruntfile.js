module.exports = function(grunt) {

  /**
   * Initialize grunt
   */
  grunt.initConfig({

    /**
     * Read package.json
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Set banner
     */
    banner: '/**\n' +
    '<%= pkg.title %> - <%= pkg.version %>\n' +
    '<%= pkg.homepage %>\n' +
    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    'License: <%= pkg.license %>\n' +
    '*/\n',


    /**
     * Set directory paths
     */
    dir: {
      js: 'js',
      css: 'css',
      img: 'img'
    },


    /**
     * Compress .jpg/.png
     * @github.com/gruntjs/grunt-contrib-imagemin
     */
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true,
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'src/<%= dir.img %>/', // Src matches are relative to this path.
          src: '*.{png,jpg,jpeg}', // Actual pattern(s) to match.
          dest: 'dist/<%= dir.img %>/', // Destination path prefix.
        }],
      }
    },


    /**
     * JSHint
     * @github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= dir.js %>/src/**/*.js']
    },


    /**
     * Minify js
     * @github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {

      // Uglify options
      options: {
        banner: '<%= banner %>'
      },

      // Minify js files in js/src/
      dist: {
        files: {
          'dist/<%= dir.js %>/main.js': ['src/<%= dir.js %>/main.js'],
          'dist/<%= dir.js %>/404.js': ['src/<%= dir.js %>/404.js'],
          'dist/<%= dir.js %>/vendor/jquery-1.11.2.min.js': ['src/<%= dir.js %>/vendor/jquery-1.11.2.min.js'],
          'dist/<%= dir.js %>/vendor/modernizr-2.8.3-respond-1.4.2.min.js': ['src/<%= dir.js %>/vendor/modernizr-2.8.3-respond-1.4.2.min.js'],
          'dist/<%= dir.js %>/vendor/mouse.parallax.min.js': ['src/<%= dir.js %>/vendor/mouse.parallax.js'],
          'dist/<%= dir.js %>/vendor/404.js': ['src/<%= dir.js %>/404.js'],
        }
      },
    },


    /**
     * Remove unused CSS
     * @github.com/addyosmani/grunt-uncss
     */
    uncss: {
      dist: {
        options: {
          ignore: [/js-.+/, '.special-class'],
          ignoreSheets: [/fonts.googleapis/],
        },
        files: {
          'dist/<%= dir.css %>/main.css': ['src/index.html'],
          'dist/<%= dir.css %>/bootstrap.min.css': ['src/index.html', 'src/404.html', 'src/games.html', 'src/hold-control.html', 'src/about.html', 'src/minformer.html','src/stardust-symphony.html'],
          'dist/<%= dir.css %>/about.css': ['src/about.html'],
          'dist/<%= dir.css %>/404.css': ['src/404.html'],
          'dist/<%= dir.css %>/hold-control.css': ['src/hold-control.html'],
          'dist/<%= dir.css %>/games.css': ['src/games.html'],
          'dist/<%= dir.css %>/minformer.css': ['src/minformer.html'],
          'dist/<%= dir.css %>/stardust-symphony.css': ['src/stardust-symphony.html']
        }
      }
    },


    /**
     * Minify CSS
     * @github.com/gruntjs/grunt-contrib-cssmin
     */
    cssmin: {
      dist: {
         options: {
            banner: '<%= banner %>'
         },
         files: {
            'dist/<%= dir.css %>/main.css': ['dist/<%= dir.css %>/main.css'],
            'dist/<%= dir.css %>/about.css': ['dist/<%= dir.css %>/about.css'],
            'dist/<%= dir.css %>/games.css': ['dist/<%= dir.css %>/games.css'],
            // 'dist/<%= dir.css %>/bootstrap.min.css': ['dist/<%= dir.css %>/bootstap.min.css'], -- Taken out due to styling getting erased when running task.
            // 'dist/<%= dir.css %>/hold-control.css': ['dist/<%= dir.css %>/hold-control.css'], -- Taken out due to styling getting erased when running task.
            'dist/<%= dir.css %>/minformer.css': ['dist/<%= dir.css %>/minformer.css'],
            'dist/<%= dir.css %>/stardust-symphony.css': ['dist/<%= dir.css %>/stardust-symphony.css'],
            'dist/<%= dir.css %>/404.css': ['dist/<%= dir.css %>/404.css'],
            'dist/<%= dir.css %>/normalize.min.css': ['src/<%= dir.css %>/normalize.min.css']
         }
      }
    },


    /**
     * Minify HTML
     * @github.com/gruntjs/grunt-contrib-htmlmin
     */
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': ['src/index.html'],
          'dist/about.html': ['src/about.html'],
          'dist/games.html': ['src/games.html'],
          'dist/hold-control.html': ['src/hold-control.html'],
          'dist/minformer.html': ['src/minformer.html'],
          'dist/stardust-symphony.html': ['src/stardust-symphony.html'],
          'dist/404.html': ['src/404.html']
        }
      }
    },


    /**
     * Copy Files
     * @github.com/gruntjs/grunt-contrib-copy
     */
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'src/js/vendor', src: ['bootstrap.min.js'], dest: 'dist/js/vendor/', filter: 'isFile'}, // TODO: Find reason for cssmin messing up styling and removed.
          {expand: true, cwd: 'src/css', src: ['hold-control.css'], dest: 'dist/css/', filter: 'isFile'},  // TODO: Find reason for cssmin messing up styling and removed.
          {expand: true, cwd: 'src', src: 'browserconfig.xml', dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src', src: 'manifest.json', dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/css', src: 'bootstrap.min.css', dest: 'dist/css/'},
          {expand: true, cwd: 'src', src: 'HoldCtrlWeb.unity3d', dest: 'dist/'},
        ]
      }
    },


    /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {
      // JShint Gruntfile
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },

      // JShint, concat + uglify JS on change
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat', 'uglify']
      },

      // cssmin on change
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['cssmin']
      },

      // Live reload files
      livereload: {
        options: { livereload: true },
        files: [
          '<%= dir.css %>/**/*.css',  // all .css files in css/ dir
          '<%= dir.js %>/**/*.js',    // all .js files in js/ dir
          '**/*.html',          // all .html
          '<%= dir.img %>/**/*.{png,jpg,jpeg,gif,svg}'  // img files in img/ dir
        ]
      }
    },


    /**
     * Clean
     * @github.com/gruntjs/grunt-contrib-clean
     */
    clean: {
      dist: ["dist/**"],
    }
  });


  /**
   * Default Task
   * run `grunt`
   */
  grunt.registerTask('default', [
    'clean',            // Clean dist/ directory
    'jshint',           // JShint
    'uglify',           // Minifiy JS files
    'uncss',            // Remove unused CSS
    'cssmin',           // Minifiy CSS files
    'htmlmin',          // Minifiy HTML files
    'imagemin',         // Compress jpg/jpeg + png files
    'copy',             // Copy files that do not need to be modified
  ]);


  /**
   * Load the plugins specified in `package.json`
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
};
