import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import reducers from '../src/reducers';

declare var module, process;

console.log(`
        ___
    . -^   \`--,
   /# =========\`-_
  /# (--====___====
 /#   .- --.  . --.|
/##  |   * ) (   * )
|##   \\    /\ \\    /|
|###   ---   \\ ---  |
|####      ___)    #|
|######           ##|
 \\##### ---------- /
  \\####           (
   \`\\###          |
     \\###         |
      \\##        |
       \\###.    .)
        \\\`======/
  SHOW ME WHAT YOU GOT
`);

if (process.env.NODE_ENV === 'production') {
  let style = document.createElement('link');
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('type', 'text/css');
  style.setAttribute('href', 'styles.css');
  document.getElementsByTagName('head')[0].appendChild(style);
}

const rootEl = document.getElementById('root');

const store = createStore(reducers,
  applyMiddleware(thunk),
);

export const getState = store.getState.bind(store);

const withRedux = (Parent) =>
  <Provider store={store}>
    <Router>
      <Parent />
    </Router>
  </Provider>;

function renderApp() {
  const Parent = require('./Parent').default;
  render(withRedux(Parent), rootEl);
}

if (module.hot) {
  module.hot.accept('./Parent', () => {
    renderApp();
  });
}

function initRender() {
  renderApp();
}

initRender();