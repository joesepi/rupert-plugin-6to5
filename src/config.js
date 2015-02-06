var Path = require('path');
var to5 = require('6to5');
var cts = require('rupert').Stassets.constructors;

cts.Script.renderers.es6 = function(code, path) {
  var result = to5.transform(code, {filename: path});

  return {
    content: result.code,
    sourceMap: result.map,
    path: path
  };
};

module.exports = function(config){
  // Use `config.find` to set or update properties
  // Use `config.prepend` and `config.append` to extend lookup arrays

  // Add the local relative node_modules to [stassets.vendors.prefix](https://github.com/RupertJS/rupert/wiki/Cookbook:-Add-Vendor-Libraries)
  config.append('stassets.vendors.prefix', [
    Path.resolve(__dirname, '../node_modules')
  ]);

  // Load jquery before other dependencies
  config.append('stassets.vendors.js', [
    '6to5/polyfill.js'
  ]);
};
