import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --accent-color: #c6e0ff;
    --chat-background-color: #2e3a4c;
    --background-color: #16161a;
    --light-text-color: #fffffe;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
    scrollbar-color: hsla(0, 0%, 100%, 0.16) transparent;
    scrollbar-width: thin !important;
  }

  ::-webkit-scrollbar {
    height: 6px !important;
    width: 6px !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsla(0, 0%, 100%, 0.16);
  }

  ::-webkit-scrollbar-track {
    margin-top: 16px !important;
  }

  body {
    background: var(--background-color);
    color: var(--light-text-color);
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  input:-webkit-autofill::first-line,
  input, button {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Jost', sans-serif;
    font-weight: 600;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
  }
`;
