import * as React from 'react';
import { IProps, IState } from './types';
import './App.css';
import { Route } from 'react-router-dom'
import { Home } from 'src/components';

class App extends React.PureComponent<IProps, IState> {

  /* Initial state for the component */
  state: IState = {};

  render() {
    return (
      <div>
        <Route path={'/'} component={Home} />
        <Route />
      </div>
    );
  }
}

export default App;
