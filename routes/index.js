var matchFiles = require('match-files'),
    path = require('path');

exports.index = function(req, res){
  var config = res.app.jasmineConfig,
      root = path.join(__dirname, '../external-app/'),
      specPath = path.join(root, config.paths.specs, '/');

  matchFiles.find(specPath, {
    fileFilters: [function(path){
      return config.patterns.spec.test(path);
    }]
  }, function(err, files){
    render({
      title: 'Your Specs',
      files: files.map(function(file){
        return file.replace(specPath, '')
      }),
      err: err
    });
  });

  function render(opts){
    res.render('index', opts);
  }

};
