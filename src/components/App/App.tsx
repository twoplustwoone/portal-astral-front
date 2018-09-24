import * as React from 'react';
import { IProps, IState } from './types';
import './App.css';
import { Route } from 'react-router-dom'
import {Home, StudentTable} from 'src/components';
import { ProfessorForm, ProfessorTable } from 'src/containers';
import Topbar from "../layout/topbar/Topbar";
import Sidebar from "../layout/sidebar/Sidebar";
import {withStyles} from "@material-ui/core";
import AdminForm from "../AdminForm/AdminForm";
import {Redirect} from "react-router";
import loginAction from "../../actions/loginActions";
import StudentForm from "../StudentForm/StudentForm";
import LoginActions from 'src/actions/loginActions';

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

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loginAction.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);

class App extends React.Component<IProps, IState> {

  /* Initial state for the component */
  state: IState = {};

  render() {
      const { classes, history}: any = this.props;

      return (
        <div className={classes.root}>
            <Topbar userName="Sebas Belaustegui"/>
            <Sidebar history={history} userType={LoginActions.loggedUser.userType}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path={'/'} component={Home} />
                <PrivateRoute path={'/new-professor'} component={ProfessorForm} />
                <PrivateRoute path={'/new-student'} component={StudentForm} />
                <PrivateRoute path={'/admin'} component={AdminForm} />
                <PrivateRoute path={'/students'} component={StudentTable} />
                <PrivateRoute path={'/student/:id'} component={StudentForm} />
                <PrivateRoute path={'/professors'} component={ProfessorTable} />
                <PrivateRoute path={'/professor/:id'} component={ProfessorForm} />
            </main>
        </div>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(App);