import * as React from 'react';
import {IProps, IState} from './types';
import './App.css';
import {Route} from 'react-router-dom'
import {AdminForm, Home} from 'src/components';
import {ProfessorForm} from 'src/containers';
import AdminListPage from "../../pages/AdminsListPage";
import NotFoundPage from "../../pages/NotFoundPage";
import {Switch} from "react-router";

class App extends React.Component<IProps, IState> {

    /* Initial state for the component */
    state: IState = {};

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>

                    <Route path='/new-professor' component={ProfessorForm}/>
                    <Route path='/professor/:id' component={ProfessorForm}/>

                    <Route path='/new-admin' component={AdminForm}/>
                    <Route path='/admins' component={AdminListPage}/>

                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
