
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
require('dotenv').config({path : './config/.env'});
var ParseDashboard = require('parse-dashboard');
var app = express();
const config = process.env;
var port = config.PORT;
var databaseUri = config.databaseUri;
console.log('database uri ' + databaseUri);
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
    databaseURI: config.databaseURI, // Connection string for your MongoDB database
    cloud: './app/routes/main.route.js', // Routes to cloud functins
    appId: config.appId,
    allowClientClassCreation : false,   
    masterKey: config.masterKey, // Keep this key secret!
    serverURL: config.serverURL // Don't forget to change to https if needed
});

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": config.serverURL,
      "appId" :  config.appId,
      "masterKey": config.masterKey,
      "appName": config.appName
    }
  ]
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
app.use('/dashboard', dashboard);

var httpsServer = require('http').createServer(app);

httpsServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port);
});