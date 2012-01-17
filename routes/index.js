var matchFiles = require('match-files'),
    path = require('path'),
    util = require('util'),
    Spec = require('../lib/spec');

exports.index = function(req, res){

  var app = res.app;

  app.jasmine.findSpecs(function(err, specs){
    render({
      title: 'Bad Runner v0.0',
      err: err,
      specs: specs
    });
  });

  function render(opts){
    res.render('index', opts);
  }

};

exports.runSingle = function(req, res){
  var app = res.app,
      spec = new Spec({
        rootPath: app.jasmine.specPath,
        file: path.join(app.jasmine.specPath, req.params[0])
      });

  spec.analyze(function(){
    res.render('single', {
      title: "Executing " + spec.relativePath,
      spec: spec
    });
  });

};
