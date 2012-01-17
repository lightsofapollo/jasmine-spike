describe("spec", function(){
  var klass = require('../lib/spec'),
      subject,
      root = __dirname + '/../external-app/spec/javascript/'
      spec = root + 'MyClassSpec.js',
      fs = require('fs');

  beforeEach(function(){
    subject = new klass({
      file: spec,
      rootPath: root
    });
  });

  describe("initialization", function(){

    it("should have saved options", function(){
      expect(subject.config).toEqual({
        file: spec,
        rootPath: root
      });
    });

    it("should have initialized analytics", function(){
      expect(subject.analytics).toEqual({});
    });

  });

  describe(".file", function(){

    it("should return full path to file", function(){
      expect(subject.file).toEqual(spec);
    });

  });

  describe(".relativePath", function(){

    it("should return path to file minus root", function(){
      expect(subject.relativePath).toEqual(
        spec.replace(root, '')
      );
    });

  });

  describe(".read", function(){
    var expected;

    beforeEach(function(){
      expected = fs.readFileSync(spec).toString();
    });

    it("should return the contents of the file", function(done){

      subject.read(function(contents){
        expect(contents).toEqual(expected);
        done()
      });

    });

  });

  describe(".analyze", function(){

    it("should save additional information on processed class in analytics", function(done){
      subject.analyze(function(){

        expect(subject.analytics).toEqual({
          name: 'MyClass',
          dependencies: ['/jasmine/source/MyClass.js']
        });

        done();
      });
    });

  });

});
