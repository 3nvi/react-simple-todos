import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion';
import { PRIMARY_COLOR } from 'utils/constants';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

injectGlobal`
  * {
    box-sizing: border-box;
    color: ${PRIMARY_COLOR};
  }
   
  html,
  body,
  #root {
    font-family: 'Lato', sans-serif;
    height: 100%;
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    padding: 0;
  }
  
  h1,h2,h3,h4 {
  font-weight: lighter;
  }
  
  dialog {
    padding: 0;
    margin: 0;
    border: none;
    box-sizing: border-box;
  }
  
  .DayPicker-TodayButton {
    color: #333;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: #333;
    color: lighten(#333, 10%);
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
    background-color: #111;
  }
  
  button {
    border: none;
    background: transparent;
    box-shadow: none;
    text-shadow: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    cursor: pointer;
    font-size: inherit;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
