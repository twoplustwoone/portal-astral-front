import {IAction, IProfessor} from "../../globals";

export interface IState {
  [id: string]: IProfessor;
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