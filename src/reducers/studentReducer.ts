import {IAction, IStudent} from "../../globals";

export interface IState {
  [id: string]: IStudent;
}

const initialState: IState = {};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default reducer;