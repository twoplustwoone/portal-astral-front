import * as React from 'react';
import { IProps, IState } from './types';

const styles = require('./Home.pcss');


class Home extends React.PureComponent<IProps, IState> {
  render() {
    return <div className={styles.home} />;
  }
}

export default Home;