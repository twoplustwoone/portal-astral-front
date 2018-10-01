// import {IAction, IStudent} from "../../globals";
// import {
//     FETCH_STUDENT_ERROR,
//     FETCH_STUDENT_SUCCESS,
//     fetchStudentError,
//     fetchStudentRequest,
//     fetchStudentSuccess, default as StudentActions
// } from "./studentActions";
// import {IStore} from "../reducers";
// import handleResponseError from "../domains/handleResponseError";

import {IStore} from "../reducers";
import {IAction, IUser} from "../../globals";
import handleResponseError from "../domains/handleResponseError";

namespace loginAction {

    export const enum FetchStates {
        SUCCESS = '@ASTRAL.FETCH_SUCCESS',
        REQUEST = '@ASTRAL.FETCH_REQUEST',
        ERROR = '@ASTRAL.FETCH_ERROR',
    }

    export const fetchRequest = (email: string, password: string): IAction => ({
        type: FetchStates.REQUEST,
    });

    export const fetchSuccess = (user: IUser): IAction => ({
        type: FetchStates.SUCCESS,
        payload: {
            user,
        },
    });

    export const fetchError = ( error: any): IAction => ({
        type: FetchStates.ERROR,
        payload: {
            error,
        },
    });

    export const logIn = (email : string, password: string) => (dispatch, getState: () => IStore) => {
        dispatch(fetchRequest(email,password));

        return fetch('http://localhost:9000/login', {
            headers:{
                "Content-Type":"application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                email : email,
                password: password,
            }),
        }) //Review path route
            .then(handleResponseError)
            .then(userLogged => {
                dispatch(fetchSuccess(userLogged));
                return true;
            })
            .catch(error => {
                dispatch(fetchError(error));
                return false;
            });
    };

    // export const logOut = ():

}

export default loginAction;