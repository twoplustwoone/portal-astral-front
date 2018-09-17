import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import uiReducer, {IState as IUIState} from './uiReducer';
import professorReducer, {IState as IProfessorState} from './professorReducer';
import adminReducer, {IState as IAdminState} from './adminReducer'

export interface IStore {
    routing: any;
    ui: IUIState;
    professors: IProfessorState;
    adminsState: IAdminState;
}

const reducers = {
    routing: routerReducer,
    ui: uiReducer,
    professors: professorReducer,
    adminsState: adminReducer,
};
export default combineReducers(reducers);