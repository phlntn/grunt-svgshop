# grunt-svgshop

Cleans up SVGs exported by Photoshop Generator. Best used with [svgmin](https://github.com/sindresorhus/grunt-svgmin).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install https://github.com/infinise/grunt-svgshop/tarball/master --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svgshop');
```

## The "svgshop" task

### Overview
In your project's Gruntfile, add a section named `svgshop` to the data object passed into `grunt.initConfig()`. Example:

```js
grunt.initConfig({
  svgshop: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.mergeCss
Type: `Boolean`
Default value: `true`

Whether to move CSS style declarations (fills, strokes, etc) to attributes on the elements (easier to minify and more compatible).

#### options.boundsColor
Type: `String`
Default value: `#ff00ff`

Color of an optional "bounds" element which can be included to force the SVG to be a certain size. It will be stripped from the cleaned-up files. (Only works with `mergeCss` enabled.)

#### options.cleanAttrs
Type: `Array`
Default value: `[
        'xmlns:xlink',
        'preserveAspectRatio',
        'fill-rule',
        'id',
        'class'
      ]`

List of (often) unnecessary attributes that will be removed.
