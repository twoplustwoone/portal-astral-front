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
import { StyleRules } from "@material-ui/core/styles";
import { PrivateRoute } from "./PrivateRoute";
import AdminTable from "../AdminTable/AdminTable";
import ProfessorForm from "../ProfessorForm/ProfessorForm";
import ProfessorTable from "../ProfessorTable/ProfessorTable";
import AdminForm from "../AdminForm/AdminForm";
import StudentForm from "../StudentForm/StudentForm";
import StudentTable from "../StudentTable/StudentTable";
import session from "../../utils/session";
import SubjectsTable from "../SubjectsTable/SubjectsTable";
import SubjectForm from "../SubjectForm/SubjectForm";
import Profile from "../Profile/Profile";
import CourseTable from "../CourseTable/CourseTable";
import CourseForm from "../CourseForm/CourseForm";
import ExamTable from "../ExamTable/ExamTable";
import ExamFrom from "../ExamForm/ExamFrom";

const styles = require('./App.pcss');

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
    backgroundColor: 'transparent',
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function Content(props: { classes: any }) {
  return <div className={props.classes.content}>
    <Route path={"/login"} component={Login} />
    <PrivateRoute exact path={"/"} component={Home} />
    <PrivateRoute path='/profile' component={Profile} />
    <PrivateRoute path='/admins' component={AdminTable} />
    <PrivateRoute path={'/admin/:id'} component={AdminForm} />
    <PrivateRoute path={'/new-admin'} component={AdminForm} />
    <PrivateRoute path={'/students'} component={StudentTable} />
    <PrivateRoute path={'/student/:id'} component={StudentForm} />
    <PrivateRoute path={'/new-student'} component={StudentForm} />
    <PrivateRoute path={'/professors'} component={ProfessorTable} />
    <PrivateRoute path={'/professor/:id'} component={ProfessorForm} />
    <PrivateRoute path={'/new-professor'} component={ProfessorForm} />
    <PrivateRoute path={'/subjects'} component={SubjectsTable} />
    <PrivateRoute path={'/subject/:id'} component={SubjectForm} />
    <PrivateRoute path={'/new-subject'} component={SubjectForm} />
    <PrivateRoute path={'/courses'} component={CourseTable} />
    <PrivateRoute path={'/new-course'} component={CourseForm} />
      <PrivateRoute path={'/course/:id'} component={CourseForm} />
      <PrivateRoute path={'/exams'} component={ExamTable} />
    <PrivateRoute path={'/course/:id'} component={CourseForm} />
    <PrivateRoute path={'/new-exam'} component={ExamFrom} />
    <PrivateRoute path={'/exam/:id'} component={ExamFrom} />
  </div>;
}

class App extends React.Component<Props, {}> {

  render() {
    const { classes } = this.props;

    const isLogged = session.isLogged();

    return <div className={styles.container}>

      <div className={styles.top}>
        <Topbar />
      </div>

      <div className={styles.bottom}>

        {
          isLogged &&
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
        }

        <div className={styles.content}>
          <Content classes={classes} />
        </div>

      </div>
    </div>;
  }
}

export default withStyles(_styles, { withTheme: true })(App);