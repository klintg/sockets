//import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import cors from 'cors';
/* eslint-disable no-console */
const http = require('http');
const express = require('express'),
  app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const port = process.env.PORT || 3000;
server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

//const app = express();
app.use(cors());
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

let connections = [];
let users = [];


io.on('connection', function(socket) {

  socket.once('disconnect', function() {
    for(let i = 0; i < users.length; i++) {
      if(users[i].id == this.id) {
        users.splice(i, 1);
      }
    }
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("Disconnected: %s sockets connected", connections.length);
    io.emit('disconnect', users);
  });

  socket.on('messageAdded', function(payload) {
    let newMessage = {
      timeStamp: payload.timeStamp,
      text: payload.text,
      user: payload.user
    };

    io.emit('messageAdded', newMessage);
  });

  socket.on('userJoined', function(payload) {
    let newUser = {
      id: this.id,
      name: payload.name
    };

    users.push(newUser);
    io.emit('userJoined', users);
    console.log('User Joined: '+ payload.name);
  });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});
