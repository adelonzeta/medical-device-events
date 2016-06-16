module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);
  grunt.initConfig({
    watch: {
      styles: {files: 'app/styles/sass/**/*.sass', tasks: ['clean:styles', 'sass']}
    },
    sass: {
      options: {sourcemap: 'none', style: 'compressed'},
      files: {expand: true, cwd: 'app/styles/sass', src: '**/*.sass', dest: 'app/styles', ext: '.css'}
    },

    bowercopy: {
      fonts: {options: {destPrefix: 'app/fonts/vendor'}, files: {'bootstrap': 'bootstrap-sass/assets/fonts/bootstrap', 'font-awesome': 'font-awesome/fonts'}},
      scripts: {options: {destPrefix: 'app/scripts/vendor'}, files: {'jquery.js': 'jquery/dist/jquery.min.js', 'bootstrap.js': 'bootstrap-sass/assets/javascripts/bootstrap.min.js'}}
    },


    clean: {
      styles: {src: 'app/styles/*.css'},
      bower: {src: ['app/fonts/vendor/**/*', 'app/scripts/vendor/**/*.js']},
      prod: {options: {force: true}, src: ['../gh-pages/**/*.html', '../gh-pages/fonts/**/*', '../gh-pages/images/**/*', '../gh-pages/scripts/**/*', '../gh-pages/styles/**/*']}
    },

    copy: {
      prod: {expand: true, cwd: 'app', src: ['**/*', '!styles/sass/**/*'], dest: '../gh-pages', filter: 'isFile'}
    }
  });
  grunt.registerTask('default', [
    'clean:styles',
    'clean:bower',
    'bowercopy',
    'sass'
  ]);
  grunt.registerTask('deploy', [
    'clean',
    'bowercopy',
    'sass',
    'copy:prod'
  ]);
};
