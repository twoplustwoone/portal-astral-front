import * as React from 'react';
import { IProps, IState } from './types';
import './App.css';
import { Route } from 'react-router-dom'
import { Home } from 'src/components';
import { ProfessorForm, ProfessorTable } from 'src/containers';
import Sidebar from "../layout/sidebar/Sidebar";
import {withStyles} from "@material-ui/core";
import AdminForm from "../AdminForm/AdminForm";
import StudentListPage from "../student/StudentListPage";
import Topbar from "../../containers/Topbar/Topbar";

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

  // topBarProps: IProps = {
  //     isLogOutOpen: false,
  //     // "onClickLogOut" | "onCloseLogOut" | "onConfirmLogOut" | "professor" | "isLogOutOpen" | "match" | "history">,
  //
  // };

  // componentDidMount() {
  //     const { professor, match } = this.props;
  //     this.props.onFetchProfessor(match.params.id);
  // }

  render() {
      const { classes, history}: any = this.props;

      return (
        <div className={classes.root}>
            {/*<Topbar onClickLogOut={professor} isLogOutOpen={false} match={{ params: { id: "sapo" }}} history={history} />*/}
            <Topbar />
            <Sidebar history={history}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path={'/'} component={Home} />
                <Route path={'/new-professor'} component={ProfessorForm} />
                <Route path={'/admin'} component={AdminForm} />
                <Route path={'/students'} component={StudentListPage} />
                <Route path={'/professors'} component={ProfessorTable} />
                <Route path={'/professor/:id'} component={ProfessorForm} />
            </main>
        </div>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(App);