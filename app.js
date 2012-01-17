
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    fs = require('fs'),
    config = require('./external-app/test_config'),
    util = require('util'),
    Jasmine = require('./lib/jasmine');

var app = module.exports = express.createServer();

app.jasmine = new Jasmine(config);

app.helpers({
  inspect: util.inspect
});

app.helpers(require('./helpers'));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  if(app.jasmine.servePath){
    app.use('/jasmine/serve', express.static(app.jasmine.servePath));
  }

  if(app.jasmine.sourcePath){
    app.use('/jasmine/source', express.static(app.jasmine.sourcePath));
  }

  if(app.jasmine.specPath){
    app.use('/jasmine/spec', express.static(app.jasmine.specPath));
  }

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.get(/^\/spec\/(.+)/, routes.runSingle);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
