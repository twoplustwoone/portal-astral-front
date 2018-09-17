import * as React from 'react';
import { IProps, IState } from './types';
import './App.css';
import { Route } from 'react-router-dom'
import { Home } from 'src/components';
import { ProfessorForm, ProfessorTable } from 'src/containers';
import Topbar from "../layout/topbar/Topbar";
import Sidebar from "../layout/sidebar/Sidebar";
import {withStyles} from "@material-ui/core";
import AdminForm from "../AdminForm/AdminForm";
import StudentTable from "../../containers/Student/StudentTable";

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

class App extends React.Component<IProps, IState> {

  /* Initial state for the component */
  state: IState = {};

  render() {
      const { classes, history}: any = this.props;

      return (
        <div className={classes.root}>
            <Topbar userName="Sebas Belaustegui"/>
            <Sidebar history={history}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path={'/'} component={Home} />
                <Route path={'/new-professor'} component={ProfessorForm} />
                <Route path={'/admin'} component={AdminForm} />
                <Route path={'/students'} component={StudentTable} />
                <Route path={'/professors'} component={ProfessorTable} />
                <Route path={'/professor/:id'} component={ProfessorForm} />
            </main>
        </div>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(App);