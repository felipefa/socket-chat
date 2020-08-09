import http from 'http';
import socketIO from 'socket.io';

import App from './App';

const server = http.createServer(App);
const io = socketIO(server);

const MESSAGES = [];

io.on('connection', socket => {
  socket.emit('readMessages', MESSAGES);

  socket.on('clientSendMessage', message => {
    MESSAGES.push(message);

    socket.broadcast.emit('newMessage', message);
  });
});

const { PORT = 3333 } = process.env;

server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}!`);
});
