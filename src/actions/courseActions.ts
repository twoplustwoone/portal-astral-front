import { IStore } from "../reducers";
import { IAction, ICourse } from "../../globals";
import handleResponseError from "../domains/handleResponseError";
import { uiActions } from "./index";


namespace CourseActions {

  export const CREATE_COURSE_REQUEST = '@ASTRAL.CREATE_COURSE_REQUEST';
  export const EDIT_COURSE_REQUEST = '@ASTRAL.EDIT_COURSE_REQUEST';
  export const DELETE_COURSE_REQUEST = '@ASTRAL.DELETE_COURSE_REQUEST';
  export const FETCH_COURSES_REQUEST = '@ASTRAL.FETCH_COURSES_REQUEST';
  export const FETCH_COURSES_SUCCESS = '@ASTRAL.FETCH_COURSES_SUCCESS';
  export const FETCH_COURSES_ERROR = '@ASTRAL.FETCH_COURSES_ERROR';
  export const FETCH_COURSE_REQUEST = '@ASTRAL.FETCH_COURSE_REQUEST';
  export const FETCH_COURSE_SUCCESS = '@ASTRAL.FETCH_COURSE_SUCCESS';
  export const FETCH_COURSE_ERROR = '@ASTRAL.FETCH_COURSE_ERROR';
  export const DELETE_COURSE_SUCCESS = '@ASTRAL.DELETE_COURSE_SUCCESS';

  export const createCourseRequest = (): IAction => ({
    type: CREATE_COURSE_REQUEST,
  });

  export const editCourseRequest = (): IAction => ({
    type: EDIT_COURSE_REQUEST,
  });

  export const createCourseError = (error): IAction => ({
    type: CREATE_COURSE_REQUEST,
    payload: {
      error,
    },
  });

  export const editCourseError = (error): IAction => ({
    type: EDIT_COURSE_REQUEST,
    payload: {
      error,
    },
  });

  export const deleteCourseRequest = (): IAction => ({
    type: DELETE_COURSE_REQUEST,
  });

  export const deleteCourseSuccess = (courseId: string): IAction => ({
    type: DELETE_COURSE_SUCCESS,
    payload: {
      courseId,
    },
  });

  export const deleteCourseError = (error): IAction => ({
    type: DELETE_COURSE_REQUEST,
    payload: {
      error,
    },
  });

  export const fetchCourseRequest = (courseId: string): IAction => ({
    type: FETCH_COURSE_REQUEST,
    payload: {
      courseId,
    },
  });

  export const fetchCourseSuccess = (course: ICourse): IAction => ({
    type: FETCH_COURSE_SUCCESS,
    payload: {
      course,
    },
  });

  export const fetchCourseError = (courseId: string, error: any): IAction => ({
    type: FETCH_COURSE_ERROR,
    payload: {
      courseId,
      error,
    },
  });

  export const fetchCoursesRequest = (): IAction => ({
    type: FETCH_COURSES_REQUEST,
  });

  export const fetchCoursesSuccess = (courses: ICourse[]): IAction => ({
    type: FETCH_COURSES_SUCCESS,
    payload: {
      courses,
    },
  });

  export const fetchCoursesError = (error: any): IAction => ({
    type: FETCH_COURSES_ERROR,
    payload: {
      error,
    },
  });

  /**
   * This is the action that calls our back-end API to create a course
   * It returns a Promise. All promises must have a catch statement
   * All fetches must dispatch actions whether they fail or succeed in order to update the Store state when necessary
   * @param course The course object to be created
   */
  export const createCourse = (course: ICourse) => (dispatch, getState: () => IStore) => {
    dispatch(createCourseRequest());
    return fetch('http://localhost:9000/course', {
      method: 'POST',
      body: JSON.stringify(course),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        return body;
      })
      .catch(error => {
        dispatch(createCourseError(error));
      });
  };

  export const updateCourse = (course: ICourse) => (dispatch, getState: () => IStore) => {
    dispatch(editCourseRequest());
    return fetch('http://localhost:9000/course/' + course.id, {
      method: 'PUT',
      body: JSON.stringify(course),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        return body;
      })
      .catch(error => {
        dispatch(editCourseError(error));
      });
  };

  export const deleteCourse = (course: ICourse) => (dispatch, getState: () => IStore) => {
    dispatch(deleteCourseRequest());
    return fetch('http://localhost:9000/course/' + course.id, {
      method: 'DELETE',
      body: JSON.stringify(course),
      headers: { 'content-type': 'application/json' },
    })
      .then(() => {
        dispatch(uiActions.closeDeleteConfirmationModal());
        return dispatch(deleteCourseSuccess(course.id));
      })
      .catch(error => {
        dispatch(deleteCourseError(error));
      });
  };

  export const fetchCourses = () => (dispatch, getState: () => IStore) => {
    dispatch(fetchCoursesRequest());

    return fetch('http://localhost:9000/course', {
      method: 'GET',
    })
      .then(handleResponseError)
      .then(courses => {
        dispatch(fetchCoursesSuccess(courses));
      })
      .catch(error => dispatch(fetchCoursesError(error)));
  };

  export const fetchCourse = (courseId: string) => (dispatch, getState: () => IStore) => {
    dispatch(fetchCourseRequest(courseId));

    return fetch('http://localhost:9000/course/' + courseId, {
      method: 'GET',
    })
      .then(handleResponseError)
      .then(course => {
        dispatch(fetchCourseSuccess(course));
      })
      .catch(error => dispatch(fetchCourseError(courseId, error)));
  };

}

export default CourseActions;