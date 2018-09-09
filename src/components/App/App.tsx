import * as React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import { Home } from 'src/components';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Route path={'/'} component={Home} />
        <Route />
      </div>
    );
  }
}

export default App;
