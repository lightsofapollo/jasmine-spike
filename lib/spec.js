var fs = require('fs'),
    vm = require('vm');

function Spec(options){

  if(typeof(options) === 'undefined'){
    options = {};
  }

  this.config = {
    //no options yet
  };

  this.config = this.utils.merge(this.config, options);
  this.analytics = {};

};

Spec.prototype = {

  //Lazy load requirements
  get utils (){
    delete Spec.prototype.utils;
    return Spec.prototype.utils = require('./utils');
  },

  get file (){
    return this.config.file;
  },

  get relativePath() {
    var path = this._relativePath ||
               this.file.replace(this.config.rootPath, '');

    this._relativePath = path;

    return this._relativePath;
  },

  read: function(callback){
    fs.readFile(this.file, function(err, buffer){
      if(err){
        throw err;
      }

      callback(buffer.toString());
    });
  },

  analyze: function(callback){

    var context = {
      dependencies: [],
      require: function(deps){
        context.dependencies.push(deps);
      },

      describe: function(name, fn){
        context.name = name;
      },

    };

    var self = this;

    this.read(function(contents){
      vm.runInNewContext(contents, context, self.file);

      self.analytics.name = context.name;
      self.analytics.dependencies = context.dependencies;

      callback();
    });
  }

};

module.exports = Spec;
