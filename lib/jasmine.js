var MatchFiles = require('match-files'),
    path = require('path'),
    Spec = require('./spec');

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

  //Pet for nice looking rel urls
  this.config.specPath = path.join(this.config.specPath, '/');

  this.fileFilters = [
    Jasmine.REGEX_FILTER(this.config.specPattern)
  ];
}

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

  _createSpec: function(path){
    return new Spec({
      file: path,
      rootPath: this.specPath
    });
  },

  findSpecs: function(callback){
    var root, options, self = this;

    options = {
      fileFilters: this.fileFilters,
      directoryFilters: this.directoryFilters
    };

    MatchFiles.find(
      this.specPath,
      options,
      //quick hack for now
      function(err, specs){
        if(err){
          throw err;
        }

        specs = specs.map(function(path){
          return self._createSpec(path);
        });

        callback(err, specs);
      }
    )
  }

}

module.exports = Jasmine;
