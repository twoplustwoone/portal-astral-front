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
import CareerForm from "../CareerForm/CareerForm";
import ExamTable from "../ExamTable/ExamTable";
import ExamForm from "../ExamForm/ExamForm";
import ExamInscriptionTable from "../ExamInscriptionTable/ExamInscriptionTable";
import CareerTable from "../CareerTable/CareerTable";
// import {MyCourses} from "../StudentCourses/MyCourses";
import { AvailableCourses } from "../StudentCourses/AvailableCourses";
import OngoingCourses from "../OngoingCourses/OngoingCourses";
import MyCourses2 from "../StudentCourses/MyCourses2";

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
    <PrivateRoute exact path='/profile' component={Profile} />
    <PrivateRoute exact path='/admins' component={AdminTable} />
    <PrivateRoute exact path={'/admin/:id'} component={AdminForm} />
    <PrivateRoute exact path={'/new-admin'} component={AdminForm} />
    <PrivateRoute exact path={'/students'} component={StudentTable} />
    <PrivateRoute exact path={'/student/:id'} component={StudentForm} />
    <PrivateRoute exact path={'/new-student'} component={StudentForm} />
    <PrivateRoute exact path={'/professors'} component={ProfessorTable} />
    <PrivateRoute exact path={'/professor/:id'} component={ProfessorForm} />
    <PrivateRoute exact path={'/new-professor'} component={ProfessorForm} />
    <PrivateRoute exact path={'/subjects'} component={SubjectsTable} />
    <PrivateRoute exact path={'/subject/:id'} component={SubjectForm} />
    <PrivateRoute exact path={'/new-subject'} component={SubjectForm} />
    <PrivateRoute exact path={'/courses'} component={CourseTable} />
    <PrivateRoute exact path={'/new-course'} component={CourseForm} />
    <PrivateRoute exact path={'/course/:id'} component={CourseForm} />
    <PrivateRoute exact path={'/careers'} component={CareerTable} />
    <PrivateRoute exact path={'/exams'} component={ExamTable} />
    <PrivateRoute exact path={'/new-exam'} component={ExamForm} />
    <PrivateRoute exact path={'/exam/:id'} component={ExamForm} />
    <PrivateRoute exact path={'/new-career'} component={CareerForm} />
    <PrivateRoute exact path={'/career/:id'} component={CareerForm} />
    <PrivateRoute exact path={'/course/:courseId/exams'} component={ExamInscriptionTable} />
    <PrivateRoute exact path={'/my-courses'} component={MyCourses2} />
    <PrivateRoute exact path={'/available-courses'} component={AvailableCourses} />
    <PrivateRoute exact path={'/ongoing-courses'} component={OngoingCourses} />
    <PrivateRoute exact path={'/view-exam/:courseId'} component={ExamCourseTable}/>
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