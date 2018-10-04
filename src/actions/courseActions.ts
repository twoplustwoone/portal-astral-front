import {IAction} from "../../globals";
import handleResponseError from "../domains/handleResponseError";
import {IStore} from "../reducers";

namespace courseActions {
    export const FETCH_SUBJECTS_REQUEST = '@ASTRAL.FETCH_SUBJECTS_REQUEST';
    export const FETCH_SUBJECTS_SUCCESS = '@ASTRAL.FETCH_SUBJECTS_SUCCESS';
    export const FETCH_SUBJECTS_ERROR = '@ASTRAL.FETCH_SUBJECTS_ERROR';

    export const CREATE_COURSE_REQUEST = '@ASTRAL.CREATE_COURSE_REQUEST';

    export const fetchSubjectsRequest = (): IAction => ({
        type: FETCH_SUBJECTS_REQUEST,
    });

    //TODO EXISTE ISUBJECT..?
    export const fetchSubjectsSuccess = (subjects: string[]): IAction => ({
        type: FETCH_SUBJECTS_SUCCESS,
        payload: {
            subjects,
        },
    });

    export const fetchSubjectsError = (error: any): IAction => ({
        type: FETCH_SUBJECTS_ERROR,
        payload: {
            error,
        },
    });


    export const createcCourseRequest = (): IAction => ({
        type: CREATE_COURSE_REQUEST,
    });

    export const createCourseError = (error): IAction => ({
        type: CREATE_COURSE_REQUEST,
        payload: {
            error,
        },
    });

    /**
     * This is the action that calls our back-end API to create a subject
     * It returns a Promise. All promises must have a catch statement
     * All fetches must dispatch actions whether they fail or succeed in order to update the Store state when necessary
     * @param subject The subject object to be created
     */

    //todo que onda esto? tengo que crear un course pero donde es la ruta?
    export const createCourse = (subject: string) => (dispatch, getState: () => IStore) => {
        dispatch(createcCourseRequest());
        return fetch('http://localhost:9000/subject', {
            method: 'POST',
            body: JSON.stringify(subject),
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

    export const fetchSubjects = () => (dispatch, getState: () => IStore) => {
        dispatch(fetchSubjectsRequest());
        return fetch('http://localhost:9000/subject', {
            method: 'GET',
        })
            .then(handleResponseError)
            .then(subjects => {
                dispatch(fetchSubjectsSuccess(subjects));
            })
            .catch(error => dispatch(fetchSubjectsError(error)));
    };
}

export default courseActions;