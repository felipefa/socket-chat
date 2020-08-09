import styled, { css } from 'styled-components';

interface MessageProps {
  isMe: boolean;
}

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;

  h1 {
    font-size: 64px;
    line-height: 1.5;
    margin-top: 32px;
  }

  > p {
    margin: 0 16px 32px;
    text-align: center;
  }

  > div {
    background: var(--chat-background-color);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 50vh;
    justify-content: space-between;
    width: 50vw;

    @media (max-width: 480px) {
      width: 300px;
    }

    > div {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: scroll;
      padding: 16px;
    }

    form {
      display: flex;
      margin: 8px;

      input {
        background: #455773;
        border: 2px solid var(--accent-color);
        border-radius: 16px;
        color: var(--light-text-color);
        height: 56px;
        min-width: 160px;
        padding: 8px;
        flex: 1;
      }

      button {
        background: var(--accent-color);
        border: none;
        border-radius: 50%;
        height: 56px;
        margin-left: 8px;
        width: 56px;
      }
    }
  }

  > small {
    margin: 16px;

    a {
      color: var(--light-text-color);
      transition: color 0.2s;

      &:hover {
        color: var(--accent-color);
      }
    }
  }
`;

export const Message = styled.div<MessageProps>`
  border-radius: 8px;
  background: #f3e281;
  color: var(--background-color);
  min-width: 120px;
  padding: 4px 8px;
  width: fit-content;

  & + div {
    margin-top: 8px;
  }

  ${({ isMe }) =>
    isMe &&
    css`
      align-self: flex-end;
      background: var(--accent-color);
      text-align: right;
    `}

  p {
    font-weight: 500;
  }

  small {
    color: var(--chat-background-color);
    font-size: 12px;
  }
`;
