import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import uiReducer, { IState as IUIState } from './uiReducer';
import professorReducer, { IState as IProfessorState } from './professorReducer';
import studentReducer, { IState as IStudentState } from './studentReducer';

export interface IStore {
  routing: any;
  ui: IUIState;
  professors: IProfessorState;
  students: IStudentState;
}

const reducers = {
  routing: routerReducer,
  ui: uiReducer,
  professors: professorReducer,
  students: studentReducer,
};
export default combineReducers(reducers);