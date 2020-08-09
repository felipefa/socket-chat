import React, { useEffect, useState, useCallback, useRef } from 'react';
import socketIOClient from 'socket.io-client';

import { Container, Message } from './styles';

interface IMessage {
  author: string;
  content: string;
  id: string;
  time: string;
}

const user = 'Felipe';

const Chat: React.FC = () => {
  const messagesDivRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [io] = useState(socketIOClient(`${process.env.REACT_APP_SOCKET_URL}`));

  const handleSubmitMessage = useCallback(
    event => {
      event.preventDefault();

      const newMessage = {
        author: io.id,
        content: String(messageInputRef.current?.value),
        id: `${user}${new Date().getTime}`,
        time: new Date().toLocaleTimeString(),
      };

      setMessages(oldMessages => [...oldMessages, newMessage]);

      io.emit('clientSendMessage', newMessage);

      if (messageInputRef.current) {
        messageInputRef.current.value = '';
        messageInputRef.current.focus();
      }

      setTimeout(() => {
        if (messagesDivRef.current) {
          messagesDivRef.current.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: messagesDivRef.current.scrollHeight,
          });
        }
      }, 100);
    },
    [io],
  );

  useEffect(() => {
    io.on('readMessages', (messagesRead: IMessage[]) => {
      setMessages(messagesRead);

      if (messagesDivRef.current) {
        messagesDivRef.current.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: messagesDivRef.current.scrollHeight,
        });
      }
    });

    io.on('newMessage', (message: IMessage) => {
      setMessages(oldMessages => [...oldMessages, message]);

      if (messagesDivRef.current) {
        messagesDivRef.current.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: messagesDivRef.current.scrollHeight,
        });
      }
    });

    return () => {
      io.disconnect();
    };
  }, [io]);

  return (
    <Container>
      <h1>Socket Chat</h1>

      <p>A simple chat app made with WebSocket using Node.js and React.js.</p>

      <div>
        <div ref={messagesDivRef}>
          {messages.map(message => (
            <Message key={message.id} isMe={message.author === io.id}>
              <p>{message.content}</p>
              <small>
                {message.author} - {message.time}
              </small>
            </Message>
          ))}
        </div>

        <form onSubmit={handleSubmitMessage}>
          <input type="text" ref={messageInputRef} />
          <button type="submit">Send</button>
        </form>
      </div>

      <small>
        <a href="https://github.com/felipefa/socket-chat">See me on GitHub.</a>
      </small>
    </Container>
  );
};

export default Chat;
