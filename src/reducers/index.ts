import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import uiReducer, { IState as IUIState } from './uiReducer';
import professorReducer, { IState as IProfessorState } from './professorReducer';
import studentReducer, { IState as IStudentState } from './studentReducer';
import adminReducer, {IState as IAdminState} from './adminReducer';
import authReducer, {IState as IAuthGuardState} from './authReducer';
import profileReducer, {IState as IUser} from './profileReducer'

export interface IStore {
  routing: any;
  ui: IUIState;
  professors: IProfessorState;
  students: IStudentState;
  adminsState: IAdminState;
  user: IUser;
  authGuard: IAuthGuardState;
}

const reducers = {
  routing: routerReducer,
  ui: uiReducer,
  professors: professorReducer,
  students: studentReducer,
  adminsState: adminReducer,
    profile: profileReducer,
  authGuard: authReducer,
};
export default combineReducers(reducers);