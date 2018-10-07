import { IAction, ICourse } from "../../globals";
import { courseActions } from "../actions";

export interface IState {
  [id: string]: ICourse;
}

const initialState: IState = {};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;

  const { FETCH_COURSES_SUCCESS, FETCH_COURSE_SUCCESS, DELETE_COURSE_SUCCESS } = courseActions;

  switch (type) {

    case DELETE_COURSE_SUCCESS:
      const { [payload.courseId]: deleted, ...rest } = state;
      return rest;

    case FETCH_COURSES_SUCCESS:
      return {
        ...payload.courses.reduce((acc, course) => ({ ...acc, [course.id]: course }), {}),
      };

    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        [payload.course.id]: payload.course,
      };

    default:
      return state;
  }
};

export default reducer;