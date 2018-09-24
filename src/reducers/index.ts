import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import uiReducer, {IState as IUIState} from './uiReducer';
import professorReducer, {IState as IProfessorState} from './professorReducer';
import studentReducer, {IState as IStudentState} from './studentReducer';
import authReducer, {IState as IAuthGuardState} from './authReducer';

export interface IStore {
    routing: any;
    ui: IUIState;
    professors: IProfessorState;
    students: IStudentState;
    authGuard: IAuthGuardState;
}

const reducers = {
    routing: routerReducer,
    ui: uiReducer,
    professors: professorReducer,
    students: studentReducer,
    loggedUser: authReducer,
};
export default combineReducers(reducers);