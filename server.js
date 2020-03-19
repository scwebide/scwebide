var http = require('http');
var express = require('express');
var path = require('path')
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');

//import SharedbAceMultipleCursors from 'sharedb-ace-mulitple-cursors/distribution/server';

var backend = new ShareDB();
createDoc(startServer);

// Create initial document then fire callback
function createDoc(callback) {
  var connection = backend.connect();
  var doc = connection.get('examples', 'textarea');
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create('test', callback);
      return;
    }
    callback();
  });
}

function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  var app = express();
  app.use(express.static(__dirname + '/dist/sc-codeshare'));
  app.get('/*', function(req,res) {
      res.sendFile(path.join(__dirname+'/dist/sc-codeshare/index.html'));
  });
  /*app.get('/ws', async (ctx) => {
    const mc = SharedbAceMultipleCursors(REDIS_URL);
    mc(ctx);
  });*/
  var server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(8080);
  console.log('Listening on http://localhost:8080');
}
