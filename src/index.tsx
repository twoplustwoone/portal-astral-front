/*import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();*/
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import createHashHistory from 'history/createHashHistory';

// import { Router, browserHistory } from 'react-router';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import rootReducer from './reducers'

import reducers from '../src/reducers';

declare var module, process;

/*console.info(
  `Running bat-ui version ${process.env.VERSION} in ${
  process.env.NODE_ENV
  } mode`
);
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
`);*/

if (process.env.NODE_ENV === 'production') {
  let style = document.createElement('link');
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('type', 'text/css');
  style.setAttribute('href', 'styles.css');
  document.getElementsByTagName('head')[0].appendChild(style);
}

// const thunkArgs = {};

const rootEl = document.getElementById('root');
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const history = createHashHistory();


// export const store: any = createStore(
//   reducers,
//   composeEnhancers(applyMiddleware(thunk.withExtraArgument(thunkArgs), routerMiddleware(history))),
// );

const store = createStore(reducers);

// const store = createStore(
//   combineReducers({
//     ...reducers,
//     routing: routerReducer
//   })
// );

// const history = syncHistoryWithStore(browserHistory, store);

export const getState = store.getState.bind(store);

// const gotProfile = (function() {
//   if (
//     !document.location.hash ||
//     !document.location.hash.startsWith('#/login')
//   ) {
//     return authActions.fetchProfile(sessionStorage.getItem('accessToken'))(
//       store.dispatch.bind(store),
//       getState
//     );
//   } else {
//     return Promise.resolve();
//   }
// })();

const withRedux = (Parent) => {
  console.log({ Provider });
  return <Provider store={store}>
    <Router>
      <Parent />
    </Router>
  </Provider>;
};

function renderApp() {
  const Parent = require('./Parent').default;
  debugger;
  render(withRedux(Parent), rootEl);
}

if (module.hot) {
  module.hot.accept('./Parent', () => {
    renderApp();
  });
}

function removeMuleyLoader() {
  if (document) {
    const loading = document.getElementById('logo-mule-wrapper');
    if (loading) {
      const parentNode = loading.parentNode;
      if (parentNode) {
        parentNode.removeChild(loading); // Cross browser fix for IE11
      }
    }
  }
}

function initRender() {
  removeMuleyLoader();
  renderApp();
}

initRender();

// gotProfile.then(() => initRender()).catch(() => initRender());