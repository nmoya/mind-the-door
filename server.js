var port = process.env.PORT || 5000;
var express = require('express');
var http = require('http');
var app = express();
var io = require('socket.io');
var fs = require("fs");
var serv_io = null;
var clients = 0;

var socket_list = {};


//Require other files 
//http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files

//Road map
init();
treatRequests();
socket_functions();

//Creates the HTTP server and configurates the libraries
function init()
{
    //app.use(express.bodyParser());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static(__dirname + '/public'));

    /* Create server */
    server = http.createServer(app)
    server.listen(port, function () {
        console.log("SERVER RUNNING. Port: " + port);
    });
    serv_io = io.listen(server);
    serv_io.set("log level", 1);
    serv_io.set('transports', [
            'websocket'
          , 'flashsocket'
          , 'htmlfile'
          , 'xhr-polling'
          , 'jsonp-polling'
        ]);
    serv_io.set("polling duration", 3);
    serv_io.set("connect timeout", 1000);
}

//Treat all GET and POST requests to the server
function treatRequests()
{
    //Main Page
    app.get("/", function(req, res) {
       res.sendfile('index.html')
    });

    /* serves all the static files */
    app.get(/^(.+)$/, function(req, res){ 
        //console.log('static file request : ' + req.params);
        res.sendfile( __dirname + req.params[0]); 
    });
}

//Responsible to send events to the client side.
function socket_functions()
{   //On connection. S is the file of a single player!!!

    serv_io.sockets.on("connection", function(s){ 
        //Update online players tag
        clients += 1;
        //serv_io.sockets.emit("online", {online: clients});
        socket_list[s.id] = s;
        console.log("Online: " + clients);
        
        s.on("disconnect", function(){
            //Updates the online tag
            clients -= 1;
            //serv_io.sockets.emit("online", {online: clients});
            console.log("Online: " + clients);
            delete socket_list[s.id];

        })    
    });
}