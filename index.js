var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

(function loadControllers() {
  require('require-all')({
    dirname     :  __dirname + '/controllers',
    filter      : /(.+-controller)\.js$/,
    recursive   : true,
    resolve     : function(controller){
      var handlers = controller.getHandlers();
      
      for(var i = 0; i < handlers.length; i++) {
        var handler = handlers[i],
            method = handler.getMethod(),
            route = controller.getBaseUrl() + handler.getRoute(),
            callback = handler.getCallback();
            
        app[method](route, callback);
      }
    }
  });
})();

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


