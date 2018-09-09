import { routerReducer } from 'react-router-redux';
import uiReducer, { IState as IUIState } from './uiReducer';
import { combineReducers } from 'redux';

export interface IStore {
  routing: any;
  ui: IUIState;
}

const reducers = {
  routing: routerReducer,
  ui: uiReducer,
};
export default combineReducers(reducers);