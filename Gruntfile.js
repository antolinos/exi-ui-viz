/*jshint strict:false */
"use strict";

module.exports = function(grunt) {
   var config = {
		    dustjs: {},
   };
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      yuidoc: {
		    compile: {
		      name: '<%= pkg.name %>',
		      description: '<%= pkg.description %>',
		      version: '<%= pkg.version %>',
		      url: '<%= pkg.homepage %>',
		      options: {
			paths: 'js/',
			outdir: 'documentation'
		      }
		    }
	  },
	  concat : {
		  prod:{
			  files : {
				 'min/exi-ui-viz.js'		: ["bower/bower.js", 'bower_components/lodash/lodash.js', "js/**/*.js"],
			  }
		  }
	  },
	  uglify : {
		  prod:{
				
			  options: {
			      beautify : true,
			      stripBanners: true,
                              drop_debugger : false,
			      compress: {
					drop_debugger : false,
					global_defs: {
					  "DEBUG": true
					},
					dead_code: true
			      },
			  },
			  files : {
				  'min/exi-ui-viz.min.js' 		: [
				                   		   	   	'min/precompiled.templates.min.js',
										'min/exi-ui-viz.js'
									  ]
			  }
		  }
	  },
	  cssmin: {
		 prod:{
			  options: {
			      shorthandCompacting: false,
			      roundingPrecision: -1
			  },
			    files: {
			          'min/exi.min.css': ['css/**/*.css']  
			    }
		}
	},
	jshint: {
		 options: {
 		      reporter: require('jshint-stylish'),
		      jshintrc : '.jshintrc'
		 },
		 prod: [ 'js/**/*.js']
	},
	plato: {
		options: {
		},
		prod: {
		  files : {'report' : ['js/**/*.js']}
		}
        },
	includeSource: {
	    	options: {
		      basePath: 'js',
		      baseUrl: '../js/'
		},
		dev: {
		      files: [{
		    	  		'dev/dev.html': 'dev/index.tpl.html'
		      }]
		}
	},
	bower_concat: {
	  all: {
	    dest: 'bower/bower.js',
		
	  }
	},
	dustjs: {
	    compile: {
	      files: {
	        	'min/precompiled.templates.min.js': ['templates/*js']
	      }
	    }
	  }


  });

  grunt.loadNpmTasks('grunt-include-source');  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-dustjs');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.task.registerTask('doc', ['yuidoc:compile']);
  grunt.task.registerTask('default', ['bower_concat', 'dustjs', 'jshint:prod' , 'plato:prod', 'concat:prod', 'uglify:prod', 'cssmin:prod', 'yuidoc:compile']);
  grunt.task.registerTask('dev', ['bower_concat', 'dustjs','includeSource:dev', 'cssmin:prod', 'plato:prod']);
  
};
