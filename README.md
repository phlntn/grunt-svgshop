# grunt-svgshop

Cleans up SVGs exported by Photoshop Generator.

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

#### options.mergeCSS
Type: `Boolean`
Default value: `true`

Whether to transform any included CSS declarations into actual attributes on the elements.

#### options.boundsColor
Type: `String`
Default value: `#ff00ff`

Color of an optional bounds object (whose only purpose is to force a specific file size) inside the SVG, which will be removed.

#### options.cleanAttrs
Type: `Array`
Default value: `[
        'xmlns:xlink',
        'preserveAspectRatio',
        'fill-rule',
        'id',
        'class'
      ]`

List of unnecessary attributes that will be removed.
