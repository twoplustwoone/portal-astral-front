import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import uiReducer, { IState as IUIState } from './uiReducer';
import professorReducer, { IState as IProfessorState } from './professorReducer';

export interface IStore {
  routing: any;
  ui: IUIState;
  professors: IProfessorState;
}

const reducers = {
  routing: routerReducer,
  ui: uiReducer,
  professors: professorReducer,
};
export default combineReducers(reducers);