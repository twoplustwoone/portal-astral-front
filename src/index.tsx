import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import createHashHistory from 'history/createHashHistory';
//
// import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
//
// // import reducers from 'reducers';
//
// import BaseService from './services/BaseService';
// import './global.css';
//
// declare var module, window, process;

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
//
// if (process.env.NODE_ENV === 'production') {
//   let style = document.createElement('link');
//   style.setAttribute('rel', 'stylesheet');
//   style.setAttribute('type', 'text/css');
//   style.setAttribute('href', 'styles.css');
//   document.getElementsByTagName('head')[0].appendChild(style);
// }

// const thunkArgs = {};

// const rootEl = document.getElementById('root');
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const history = createHashHistory();

// export const store: any = createStore(
//   reducers,
//   composeEnhancers(applyMiddleware(thunk.withExtraArgument(thunkArgs), routerMiddleware(history)))
// );

// export const getState = store.getState.bind(store);

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

// const withRedux = (Parent) =>
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Parent />
//     </ConnectedRouter>
//   </Provider>;

// function renderApp() {
//   const Parent = require('./Parent').default;
//   ReactDOM.render(withRedux(Parent), rootEl);
// }
//
// Object.keys(services)
//   .map(key => services[key])
//   .filter(svc => svc instanceof BaseService)
//   .forEach(svc => svc.initializeStore(store));
//
// if (module.hot) {
//   module.hot.accept('./Parent', () => {
//     renderApp();
//   });
// }
//
// function removeMuleyLoader() {
//   if (document) {
//     const loading = document.getElementById('logo-mule-wrapper');
//     if (loading) {
//       loading.parentNode.removeChild(loading); // Cross browser fix for IE11
//     }
//   }
// }
//
// function initRender() {
//   removeMuleyLoader();
//   renderApp();
// }
//
// gotProfile.then(() => initRender()).catch(() => initRender());