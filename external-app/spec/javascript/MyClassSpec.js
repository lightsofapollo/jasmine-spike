//Evergreen compat
require('/jasmine/source/MyClass.js');

describe("MyClass", function(){

  var subject;

  describe("initialization", function(){

    beforeEach(function(){
      subject = new MyClass('foo');
    });

    it("should work", function(){
      expect(subject.args[0]).toBe('foo');
    });
  });

  it("should show main scope", function(){

  });

  describe("deeply", function(){

    describe("nested", function(){

      it("things!", function(){

      });

    });

  });

});
