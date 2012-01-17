describe("jasmine", function(){

  var subject, klass = require('../lib/jasmine'), defaultOptions = {
        sourcePath: 'public/javascript',
        specPath: 'spec/javascript',
        servePath: 'public',
        specPattern: /spec\.js$/i
      }, 
      util = klass.prototype.utils,
      path = require('path'),
      root = path.join(__dirname, '../external-app'),
      Spec = require('../lib/spec');

  function hasOption(name, value) {
    it("should have set option '" + name + "' to: " + value, function(){
      var orig = subject.config[name];

      if(value instanceof RegExp){
        orig = orig.toString();
        value = value.toString();
      }

      expect(orig).toEqual(value);
    });
  };

  function hasOptions (options) {
    for(key in options){
      if(options.hasOwnProperty(key)){
        hasOption(key, options[key]);
      }
    }
  };

  beforeEach(function(){
    subject = new klass({rootPath: root});
  });

  describe("init", function(){
    beforeEach(function(){
      subject = new klass();
    });

    it("should contain a reference to utils", function(){
      expect(subject.utils).toBe(require('../lib/utils'));
    });

    hasOptions(defaultOptions);

    describe("when overriding options", function(){

      var newOpts = {
        servePath: 'foo/bar',
        specPath: 'bar/foo'
      };

      beforeEach(function(){
        subject = new klass(newOpts);
      });

      hasOptions(util.merge(defaultOptions, newOpts));

    });

  });

  describe(".specPath", function(){

    it("should be an absolute path to the specs", function(){
      expect(path.join(
        root, 'spec', 'javascript'
      )).toBe(subject.specPath);
    });
  });

  describe(".servePath", function(){
    it("should be an absolute path to the servePath", function(){
      expect(path.join(
        root, 'public'
      )).toBe(subject.servePath);

    });
  });

  describe(".sourcePath", function(){
    it("should be an absolute path to the sourcePath", function(){
      expect(path.join(
        root, 'public', 'javascript'
      )).toBe(subject.sourcePath);

    });
  });

  describe("._createSpec", function(){

    var result,
        file = root + '/spec/javascript/MyClassSpec.js';

    beforeEach(function(){
      result = subject._createSpec(file);
    });

    it("should be an instance of Spec", function(){
      expect(result instanceof Spec).toBe(true);
    });

    it("should have set file in spec", function(){
      expect(result.file).toEqual(file);
    });

  });

  describe(".findSpecs", function(){

    var list = [
      'FakeSpec.js',
      'MyClassSpec.js',
      'dir/OtherSpec.js'
    ], expected;

    beforeEach(function(){
      expected = list.map(function(item){
        return path.join(subject.specPath, item);
      }).sort();

    });

    it("should find all specs", function(done){
      subject.findSpecs(function(err, specs){
        var specFiles = specs.map(function(item){
          return item.file;
        }), i, len;

        for(i = 0, len = specs.length; i < len; i++){
          expect(specs[i] instanceof Spec).toBe(true)
        }

        expect(specFiles.sort()).toEqual(expected);
        done();
      });
    });

  });

});
