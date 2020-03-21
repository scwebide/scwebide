var http = require('http');
var express = require('express');
var path = require('path')
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('@teamwork/websocket-json-stream');

//const {subscribe : SharedbAceMultipleCursorsServer} = require('@elgiano/sharedb-ace-multiple-cursors/dist/server');
const {subscribe : SharedbAceMultipleCursorsServer} = require('../sharedb-ace-multiple-cursors/dist/server');

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

  const cursorDb = {};

  /*app.get('/cursor', function(ctx) {
    console.log("getting c")

  });*/
  var server = http.createServer(app);


  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws,req) {
    if(req.url == '/cursor'){
      SharedbAceMultipleCursorsServer(ws,cursorDb);
    }else{
      var stream = new WebSocketJSONStream(ws);
      backend.listen(stream);
    }
  });

  const port = process.env.PORT || 80
  server.listen(port);
  console.log(`Listening on http://localhost:${port}`);
}
