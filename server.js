const server = require('express')(); 
const http = require('http').createServer(server);
const io = require("socket.io")(http, {
    cors: {
      origin: ["https://localhost:8080"],
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

let players = [];

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);
    
    if (players.length === 1) {
        io.emit('isPlayerA')
    }

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
    })
});

http.listen(3000, () => {
    console.log('Server started!');
}); 