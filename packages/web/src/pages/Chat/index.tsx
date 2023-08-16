import React, { useEffect, useState, useCallback, useRef } from 'react';
import socketIOClient from 'socket.io-client';

import { Container, Message } from './styles';

interface IMessage {
  author: string;
  content: string;
  id: string;
  time: string;
}

const io = socketIOClient(`${process.env.REACT_APP_SOCKET_URL}`, {
  transports: ['websocket'],
});

const Chat: React.FC = () => {
  const messagesDivRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const hasSetIoListeners = useRef(false);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSubmitMessage: React.FormEventHandler<HTMLFormElement> | undefined = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newMessage = {
        author: io.id,
        content: String(messageInputRef.current?.value),
        id: `${new Date().getTime()}`,
        time: new Date().toLocaleString(),
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
    [],
  );

  useEffect(() => {
    if (!hasSetIoListeners.current) {
      io.on('readMessages', (messagesRead: IMessage[]) => {
        setMessages(messagesRead);

        setTimeout(() => {
          if (messagesDivRef.current) {
            messagesDivRef.current.scrollTo({
              behavior: 'smooth',
              left: 0,
              top: messagesDivRef.current.scrollHeight,
            });
          }
        }, 100);
      });

      io.on('newMessage', (message: IMessage) => {
        setMessages(oldMessages => [...oldMessages, message]);

        setTimeout(() => {
          if (messagesDivRef.current) {
            messagesDivRef.current.scrollTo({
              behavior: 'smooth',
              left: 0,
              top: messagesDivRef.current.scrollHeight,
            });
          }
        }, 100);
      });

      hasSetIoListeners.current = true;
    }
  }, []);

  return (
    <Container>
      <h1>Socket Chat</h1>

      <p>A simple chat app made with WebSocket using Node.js and React.js.</p>

      <div>
        <div ref={messagesDivRef}>
          {messages.map(message => (
            <Message key={message.id} $isMe={message.author === io.id}>
              <p>{message.content}</p>
              <small>
                {message.author === io.id ? 'You' : message.author} - {message.time}
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
