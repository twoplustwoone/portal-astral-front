import {IAction, ICourse} from "../../globals";
import handleResponseError from "../domains/handleResponseError";
import {IStore} from "../reducers";
import {uiActions} from "./index";

namespace coursesActions {

    export const enum CourseTypes {
        REQUEST_FETCH_ALL_PAST = '@ASTRAL.FETCH_ALL_PAST_COURSE_REQUEST',
        REQUEST_UPDATE = '@ASTRAL.UPDATE_COURSE_REQUEST',
        REQUEST_DELETE = '@ASTRAL.DELETE_COURSE_REQUEST',
        SUCCESS_FETCH_ALL_PAST = '@ASTRAL.FETCH_ALL_PAST_COURSE_SUCCESS',
        SUCCESS_UPDATE = '@ASTRAL.UPDATE_COURSE_SUCCESS',
        SUCCESS_DELETE = '@ASTRAL.DELETE_COURSE_SUCCESS',
        ERROR = '@ASTRAL.COURSE_ERROR',
    }

    // FETCH DISPATCH

    export const fetchAllPastCoursesRequest = (id: string): IAction => ({
        type: CourseTypes.REQUEST_FETCH_ALL_PAST,
        payload: {
            id,
        },
    });

    export const fetchAllPastCoursesSuccess = (pastCourses: []): IAction => ({
        type: CourseTypes.SUCCESS_FETCH_ALL_PAST,
        payload: {
            pastCourses,
        },
    });

    export const fetchError = (error: any): IAction => ({
        type: CourseTypes.ERROR,
        payload: {
            error,
        },
    });

    export const fetchPastCourses = (id: string) => (dispatch, getState: () => IStore) => {
        dispatch(fetchAllPastCoursesRequest(id));

        return fetch('http://localhost:9000/past-courses/' + id, {
            method: 'GET',
        })
            .then(handleResponseError)
            .then(courses => {
                dispatch(fetchAllPastCoursesSuccess(courses))
            })
            .catch(error => dispatch(fetchError(error)))
    };


    // DELETE DISPATCH

    export const deleteCourseRequest = (): IAction => ({
        type: CourseTypes.REQUEST_DELETE,
    });

    export const deleteCourseSuccess = (courseId: string): IAction => ({
        type: CourseTypes.SUCCESS_DELETE,
        payload: {
            courseId,
        },
    });

    export const deleteCourseError = (error: any): IAction => ({
        type: CourseTypes.ERROR,
        payload: {
            error,
        },
    });

    export const deleteCourse = (courseToDelete: ICourse) => (dispatch, getState: () => IStore) => {
        dispatch(deleteCourseRequest());

        return fetch('http://localhost:9000/past-courses/' + courseToDelete.id, {
            method: 'DELETE',
            body: JSON.stringify(courseToDelete),
            headers: {'content-type': 'application/json'},
        })
            .then(() => {
                dispatch(uiActions.closeDeleteConfirmationModal());
                return dispatch(deleteCourseSuccess(courseToDelete.id));
            })
            .catch(error => {
                dispatch(deleteCourseError(error));
            });
    };
    // EDIT DISPATCH

    export const updateCourseRequest = (): IAction => ({
        type: CourseTypes.REQUEST_UPDATE,
    });

    export const updateCourseSuccess = (courseId: string): IAction => ({
        type: CourseTypes.SUCCESS_UPDATE,
        payload: {
            courseId,
        },
    });

    export const updateCourseError = (error: any): IAction => ({
        type: CourseTypes.ERROR,
        payload: {
            error,
        },
    });

    export const updateCourse = (courseToEdit: ICourse) => (dispatch, getState: () => IStore) => {
        dispatch(updateCourseRequest());

        return fetch('http://localhost:9000/past-courses/' + courseToEdit.id, {
            method: 'PUT',
            body: JSON.stringify(courseToEdit),
            headers: {'content-type': 'application/json'},
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                return body;
            })
            .catch(error => {
                dispatch(updateCourseError(error));
            });
    }


}

export default coursesActions;