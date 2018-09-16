import {IStore} from "../reducers";
import {IAction} from "../../globals";

namespace StudentActions {
    export const GET_STUDENT_REQUEST = '@ASTRAL.GET_STUDENT_REQUEST';

    export const getStudentRequest = (): IAction => ({
        type: GET_STUDENT_REQUEST,
    });

    export const getStudentError = (error): IAction => ({
        type: GET_STUDENT_REQUEST,
        payload: {
            error,
        },
    });

    export const getStudentSuccess = (success): IAction => ({
        type: GET_STUDENT_REQUEST,
        payload: {
            success,
        },
    });

    export const getStudents = () => (dispatch, getState: () => IStore) => {
        dispatch(getStudentRequest());

        return fetch(`/student`, {
            method: 'GET',
        })
            .then(response => {
                dispatch(getStudentSuccess(response));
            })
            .catch(error => {
                dispatch(getStudentError(error));
            });
    }
}

export default StudentActions;