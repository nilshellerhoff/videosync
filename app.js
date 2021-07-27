const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const randomAnimalName = require('random-animal-name');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});

app.get('/video.mp4', (req, res) => {
  res.sendFile(__dirname + '/video.mp4');
});

app.get('/log', (req, res) => {
  res.send(log);
})

// get a random animal name as clientID
app.get('/clientID.js', (req, res) => {
  res.setHeader('content-type', 'application/javascript');
  res.send(
    'var clientID = "' + randomAnimalName() + '"'
    );
});

io.on('connection', (socket) => {
  socket.on('msg', (msg) => {
    io.emit('msg', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});