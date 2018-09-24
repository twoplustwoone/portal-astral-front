import * as React from 'react';
import { IProps, IState } from './types';

const styles = require('./Home.pcss');


class Home extends React.Component<IProps, IState> {
  render() {
      return <div className={styles.home} >Home!</div>;
  }
}

export default Home;