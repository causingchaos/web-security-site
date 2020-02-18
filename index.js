var express = require('express');
var app = express();

require('dotenv').config()

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.get('/', function (request, response) {
  var env = process.env.APP_ENV;
  if (env == 'staging') {
    var envName = 'staging'
  } else if (env == 'production') {
    var envName = 'production'
  } else {
    var envName = 'review app'
  }
  response.set({ //C-S-P:  
    //"Content-Security-Policy": "script-src 'self'"  -- will block scripts outside our security-site web address (http://security-site.herokuapp.com)
    // default-src 'none'   this will block all fonts, images, ect not part of our source
    "Content-Security-Policy": "default-src 'none' ;script-src 'self' https://security-resources.herokuapp.com https://ajax.googleapis.com https://platform.linkedin.com https://www.linkedin.com; frame-src https://www.linkedin.com; img-src https://security-resources.herokuapp.com; style-src https://security-resources.herokuapp.com 'unsafe-inline'; font-src https://security-resources.herokuapp.co"

    
    //frame-src is for the linked in widget, also the other content policy
    
  });
  response.render('index.html', { env: envName });
});

app.listen(app.get('port'), function () {
  console.log("Node app running at localhost:" + app.get('port'));
});

module.exports = app
