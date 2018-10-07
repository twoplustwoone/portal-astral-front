import * as React from 'react';
import { Props } from './types';
import { Route } from 'react-router-dom'
import Topbar from "../layout/topbar/Topbar";
import Sidebar from "../layout/sidebar/Sidebar";
import { Theme, withStyles } from "@material-ui/core";
// import AdminForm from "../AdminForm/AdminForm";
// import StudentForm from "../StudentForm/StudentForm";
// import ProfessorForm from "../ProfessorForm/ProfessorForm";
import Login from "../Login/Login";
// import StudentTable from "../student/all-students/StudentTable";
// import ProfessorTable from "../ProfessorTable/ProfessorTable";
import Home from "../Home/Home";
// import { PrivateRoute } from "./PrivateRoute";
import { StyleRules } from "@material-ui/core/styles";
import { PrivateRoute } from "./PrivateRoute";
// import AdminsTableView from "../AdminsTable/AdminsTableView";

const styles = require('./App.pcss')

const _styles = (theme: Theme): StyleRules => ({
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

function Content(props: { classes: any }) {
  return <main className={props.classes.content}>
    <div className={props.classes.toolbar} />
    <Route path={"/login"} component={Login} />
    <PrivateRoute exact path={"/"} component={Home} />
    {/*<PrivateRoute path={'/new-professor'} component={ProfessorForm} />*/}
    {/*<PrivateRoute path={'/new-student'} component={StudentForm} />*/}
    {/*<PrivateRoute path='/admins' component={AdminsTableView} />*/}
    {/*<PrivateRoute path={'/admin'} component={AdminForm} />*/}
    {/*<PrivateRoute path={'/students'} component={StudentTable} />*/}
    {/*<PrivateRoute path={'/student/:id'} component={StudentForm} />*/}
    {/*<PrivateRoute path={'/professors'} component={ProfessorTable} />*/}
    {/*<PrivateRoute path={'/professor/:id'} component={ProfessorForm} />*/}
  </main>;
}

class App extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    return <div className={styles.container}>

      <div className={styles.top}>
        <Topbar />
      </div>

      <div className={styles.bottom}>

        <Sidebar />

        <Content classes={classes} />

      </div>
    </div>;
  }
}

export default withStyles(_styles, { withTheme: true })(App);