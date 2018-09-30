import { IAction, ISubject } from "../../globals";
import SubjectActions from "../actions/subjectActions";

export interface IState {
  [id: string]: ISubject;
}

const initialState: IState = {};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;

  const { FETCH_SUBJECTS_SUCCESS, FETCH_SUBJECT_SUCCESS, DELETE_SUBJECT_SUCCESS } = SubjectActions;

  switch (type) {

    case DELETE_SUBJECT_SUCCESS:
      const { [payload.subjectId]: deleted, ...rest } = state;
      return rest;

    case FETCH_SUBJECTS_SUCCESS:
      return {
        ...payload.subjects.reduce((acc, subject) => ({ ...acc, [subject.id]: subject }), {}),
      };

    case FETCH_SUBJECT_SUCCESS:
      return {
        ...state,
        [payload.subject.id]: payload.subject,
      };

    default:
      return state;
  }
};

export default reducer;