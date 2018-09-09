import * as React from 'react';
import { IProps, IState } from './types';

const styles = require('./Home.css');


class Home extends React.PureComponent<IProps, IState> {
  render() {
    return <div className={styles.home}>Hello</div>;
  }
}

export default Home;