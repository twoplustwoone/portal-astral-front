import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import uiReducer, { IState as IUIState } from './uiReducer';
import professorReducer, { IState as IProfessorState } from './professorReducer';
import courseReducer, { IState as ICourseState } from './courseReducer';
import studentReducer, { IState as IStudentState } from './studentReducer';
import adminReducer, {IState as IAdminState} from './adminReducer';
import authReducer, {IState as IAuthGuardState} from './authReducer';

export interface IStore {
  routing: any;
  ui: IUIState;
  professors: IProfessorState;
  courses: ICourseState;
  students: IStudentState;
  adminsState: IAdminState;
  authGuard: IAuthGuardState;
}

const reducers = {
  routing: routerReducer,
  ui: uiReducer,
  professors: professorReducer,
  students: studentReducer,
  courses: courseReducer,
  adminsState: adminReducer,
  authGuard: authReducer,
};
export default combineReducers(reducers);