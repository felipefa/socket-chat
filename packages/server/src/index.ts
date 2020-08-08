import http from 'http';
import socketIO from 'socket.io';

import App from './App';

const server = http.createServer(App);
const io = socketIO(server);

io.on('connection', socket => {
  socket.emit('readMessages', 'readMessages');
  socket.on('clientSendMessage', data => {
    console.log('call sendMessage service ' + data);
  });
});

const { PORT = 3333 } = process.env;

server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}!`);
});
