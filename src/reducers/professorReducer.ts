import { IAction, IProfessor } from "../../globals";
import { professorActions } from "../actions";

export interface IState {
  [id: string]: IProfessor;
}

const initialState: IState = {};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;

  const { FETCH_PROFESSORS_SUCCESS, FETCH_PROFESSOR_SUCCESS, DELETE_PROFESSOR_SUCCESS } = professorActions;

  switch (type) {

    case DELETE_PROFESSOR_SUCCESS:
      const { [payload.professorId]: deleted, ...rest } = state;
      return rest;

    case FETCH_PROFESSORS_SUCCESS:
      return {
        ...payload.professors.reduce((acc, professor) => ({ ...acc, [professor.id]: professor }), {}),
      };

    case FETCH_PROFESSOR_SUCCESS:
      return {
        ...state,
        [payload.professor.id]: payload.professor,
      };

    default:
      return state;
  }
};

export default reducer;