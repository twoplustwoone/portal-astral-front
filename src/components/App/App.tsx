import * as React from 'react';
import { IProps, IState } from './types';
import './App.css';
import { Route } from 'react-router-dom'
import { Home } from 'src/components';
import { ProfessorForm } from 'src/containers';

class App extends React.Component<IProps, IState> {

  /* Initial state for the component */
  state: IState = {};

  render() {
    return (
      <div>
        <Route path={'/'} component={Home} />
        <Route path={'/new-professor'} component={ProfessorForm} />
        <Route path={'/professor/:id'} component={ProfessorForm} />
        <Route />
      </div>
    );
  }
}

export default App;
