import http from 'http';
import { Server } from 'socket.io';

import App from './App';

const server = http.createServer(App);
const io = new Server(server, {
  cors: { origin: '*' },
  transports: ['websocket'],
});

const MESSAGES = [
  {
    author: 'Server',
    content: 'Welcome!\nFeel free to send a message :)',
    id: `server-${new Date().getTime()}`,
    time: new Date().toLocaleString(),
  }
];

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
