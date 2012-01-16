var matchFiles = require('match-files'),
    path = require('path');

Jasmine.SPEC_REGEX = /spec\.js$/i;

Jasmine.REGEX_FILTER = function(regex){
  return function(path){
    return !!regex.test(path);
  };
};

function Jasmine(config){
  if(typeof(options) === 'undefined'){
    options = {};
  }

  this.config = this.utils.merge({
    sourcePath: 'public/javascript',
    specPattern: Jasmine.SPEC_REGEX,
    specPath: 'spec/javascript',
    servePath: 'public',
    //This is required but has no default
    rootPath: null
  }, config);

  this.fileFilters = [
    Jasmine.REGEX_FILTER(this.config.specPattern)
  ];
};

Jasmine.prototype = {

  _absPath: function(name){
    return this['_' + name] = this['_' + name] || path.join(
      this.config.rootPath,
      this.config[name]
    );
  },

  //Lazy load requirements
  get utils (){
    delete Jasmine.prototype.utils;
    return Jasmine.prototype.utils = this.utils = require('./utils');
  },

  get specPath (){
    return this._absPath('specPath');
  },

  get servePath (){
    return this._absPath('servePath');
  },

  get sourcePath (){
    return this._absPath('sourcePath');
  },

  directoryFilters: [
    function(path){
      return !/(.svn|.git)$/.test(path);
    }
  ],

  findSpecs: function(callback){
    var root, options;

    options = {
      fileFilters: this.fileFilters,
      directoryFilters: this.directoryFilters
    };

    matchFiles.find(
      this.specPath,
      options,
      callback
    )
  }

}

module.exports = Jasmine;
