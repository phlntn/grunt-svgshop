/*
 * grunt-svgshop
 * https://github.com/infinise/grunt-svgshop
 *
 * Copyright (c) 2015 infinise
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var cheerio = require('cheerio');
  var css = require('css');
  
  grunt.registerMultiTask('svgshop', 'Cleans up SVGs exported by Photoshop.', function() {
    
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mergeCss: true,
      cleanAttrs: [
        'preserveAspectRatio',
        'fill-rule',
        'id',
        'class',
        'xmlns:xlink'
      ],
      boundsColor: '#ff00ff'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Process source files
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        
        var contentStr = grunt.file.read(filepath);
        var $ = cheerio.load(contentStr, { 
          normalizeWhitespace: true,
          xmlMode: true
        });
            
        // Merge CSS
        
        if (options.mergeCss) {
          var style = [];
          if ($('style')) {
            style = css.parse( $('style').html() ).stylesheet.rules;
            $('style').remove();
            
            style.forEach(function(rule){
              rule.selectors.forEach(function(sel){
                rule.declarations.forEach(function(decl){
                  $(sel).attr(decl.property, decl.value);
                  grunt.verbose.writeln('  Applied'['green'], decl.property + ': ' + decl.value, 'to'['grey'], sel);
                })
              })
            });
          }
        }
        
        // Remove unnecessary attributes
        
        function cleanAttrs(el) {
          options.cleanAttrs.forEach(function(attr){
            if ($(el).attr(attr) != undefined) {
              $(el).removeAttr(attr);
              grunt.verbose.writeln('  Removed'['yellow'], attr, 'from'['grey'], el.name);
            }
          })
          
          $(el).children().each(function(i, el){
            cleanAttrs(el);
          })
        }
        
        cleanAttrs($('svg')[0]);
        
        // Remove bounds element
        
        var el = $('*[fill="' + options.boundsColor + '"]')[0];
        if (el) {
          grunt.verbose.writeln('  Removed'['magenta'], 'bounds', el.name);
          $(el).remove();
        }
        
      
        grunt.file.write(f.dest, $.html());
        
        
      });
    });
  });

};
