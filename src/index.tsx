import * as React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

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

const withRouter = (Parent) => (
    <BrowserRouter>
        <Parent/>
    </BrowserRouter>
);

function renderApp() {
    const Parent = require('./Parent').default;
    render(withRouter(Parent), rootEl);
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