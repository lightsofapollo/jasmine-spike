var matchFiles = require('match-files'),
    path = require('path'),
    util = require('util');

exports.index = function(req, res){

  var app = res.app;

  app.jasmine.findSpecs(function(err, specs){
    render({
      title: 'Bad Runner v0.0',
      err: err,
      files: specs.map(function(file){
        return file.replace(app.jasmine.specPath, '');
      })
    });
  });

  function render(opts){
    res.render('index', opts);
  }

};

