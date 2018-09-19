import { IStore } from "../reducers";
import { IAction, IStudent } from "../../globals";
import handleResponseError from "../domains/handleResponseError";

namespace StudentActions {

    export const CREATE_STUDENT_REQUEST = '@ASTRAL.CREATE_STUDENT_REQUEST';
    export const EDIT_STUDENT_REQUEST = '@ASTRAL.EDIT_STUDENT_REQUEST';
    export const DELETE_STUDENT_REQUEST = '@ASTRAL.DELETE_STUDENT_REQUEST';
    export const FETCH_STUDENTS_REQUEST = '@ASTRAL.FETCH_STUDENTS_REQUEST';
    export const FETCH_STUDENTS_SUCCESS = '@ASTRAL.FETCH_STUDENTS_SUCCESS';
    export const FETCH_STUDENTS_ERROR = '@ASTRAL.FETCH_STUDENTS_ERROR';
    export const FETCH_STUDENT_REQUEST = '@ASTRAL.FETCH_STUDENT_REQUEST';
    export const FETCH_STUDENT_SUCCESS = '@ASTRAL.FETCH_STUDENT_SUCCESS';
    export const FETCH_STUDENT_ERROR = '@ASTRAL.FETCH_STUDENT_ERROR';
    export const DELETE_STUDENT_SUCCESS = '@ASTRAL.DELETE_STUDENT_SUCCESS';

    export const createStudentRequest = (): IAction => ({
        type: CREATE_STUDENT_REQUEST,
    });

    export const editStudentRequest = (): IAction => ({
        type: EDIT_STUDENT_REQUEST,
    });

    export const createStudentError = (error): IAction => ({
        type: CREATE_STUDENT_REQUEST,
        payload: {
            error,
        },
    });

    export const editStudentError = (error): IAction => ({
        type: EDIT_STUDENT_REQUEST,
        payload: {
            error,
        },
    });

    export const deleteStudentRequest = (): IAction => ({
        type: DELETE_STUDENT_REQUEST,
    });

    export const deleteStudentSuccess = (): IAction => ({
        type: DELETE_STUDENT_SUCCESS,
    });

    export const deleteStudentError = (error): IAction => ({
        type: DELETE_STUDENT_REQUEST,
        payload: {
            error,
        },
    });

    export const fetchStudentRequest = (studentId: string): IAction => ({
        type: FETCH_STUDENT_REQUEST,
        payload: {
            studentId,
        },
    });

    export const fetchStudentSuccess = (student: IStudent): IAction => ({
        type: FETCH_STUDENT_SUCCESS,
        payload: {
            student,
        },
    });

    export const fetchStudentError = (studentId: string, error: any): IAction => ({
        type: FETCH_STUDENT_ERROR,
        payload: {
            studentId,
            error,
        },
    });

    export const fetchStudentsRequest = (): IAction => ({
        type: FETCH_STUDENTS_REQUEST,
    });

    export const fetchStudentsSuccess = (students: IStudent[]): IAction => ({
        type: FETCH_STUDENTS_SUCCESS,
        payload: {
            students,
        },
    });

    export const fetchStudentsError = (error: any): IAction => ({
        type: FETCH_STUDENTS_ERROR,
        payload: {
            error,
        },
    });

    /**
     * This is the action that calls our back-end API to create a student
     * It returns a Promise. All promises must have a catch statement
     * All fetches must dispatch actions whether they fail or succeed in order to update the Store state when necessary
     * @param student The student object to be created
     */
    export const createStudent = (student: IStudent) => (dispatch, getState: () => IStore) => {
        dispatch(createStudentRequest());
        student.file = "";
        return fetch('http://localhost:9000/student', {
            method: 'POST',
            body: JSON.stringify(student),
            headers: { 'content-type': 'application/json' },
        })
            .then(function (response) {
                return response
            }).then(function (body) {
            })
            .catch(error => {
                dispatch(createStudentError(error));
            });
    };

    export const updateStudent = (student: IStudent) => (dispatch, getState: () => IStore) => {
        dispatch(editStudentRequest());
        return fetch('http://localhost:9000/student/' + student.id, {
            method: 'PUT',
            body: JSON.stringify(student),
            headers: { 'content-type': 'application/json' },
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
            })
            .catch(error => {
                dispatch(editStudentError(error));
            });
    };

    export const deleteStudent = (student: IStudent) => (dispatch, getState: () => IStore) => {
        dispatch(deleteStudentRequest());
        return fetch('http://localhost:9000/student/' + student.id, {
            method: 'DELETE',
            body: JSON.stringify(student),
            headers: { 'content-type': 'application/json' },
        })
            .then(function (response) {
                return response.json()
            }).then(function (body) {
                return dispatch(deleteStudentSuccess());
            })
            .catch(error => {
                dispatch(deleteStudentError(error));
            });
    };

    export const fetchStudents = () => (dispatch, getState: () => IStore) => {
        dispatch(fetchStudentsRequest());

        return fetch('http://localhost:9000/student', {
            method: 'GET',
        })
            .then(handleResponseError)
            .then(students => {
                dispatch(fetchStudentsSuccess(students));
            })
            .catch(error => dispatch(fetchStudentsError(error)));
    };

    export const fetchStudent = (studentId: string) => (dispatch, getState: () => IStore) => {
        dispatch(fetchStudentRequest(studentId));

        return fetch('http://localhost:9000/student/' + studentId, {
            method: 'GET',
        })
            .then(handleResponseError)
            .then(student => {
                dispatch(fetchStudentSuccess(student));
            })
            .catch(error => dispatch(fetchStudentError(studentId, error)));
    };

}

export default StudentActions;