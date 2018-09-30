import { IStore } from "../reducers";
import {IAction, IUser} from "../../globals";
import handleResponseError from "../domains/handleResponseError";
import { uiActions } from "./index";


namespace ProfileActions {

    export const EDIT_USER_REQUEST = '@ASTRAL.EDIT_USER_REQUEST';
    export const DELETE_USER_REQUEST = '@ASTRAL.DELETE_USER_REQUEST';
    export const DELETE_USER_SUCCESS = '@ASTRAL.DELETE_USER_SUCCESS';
    export const DELETE_USER_ERROR = '@ASTRAL.DELETE_USER_ERROR';
    export const FETCH_USER_REQUEST = '@ASTRAL.FETCH_USER_REQUEST';
    export const FETCH_USER_SUCCESS = '@ASTRAL.FETCH_USER_SUCCESS';
    export const FETCH_USER_ERROR = '@ASTRAL.FETCH_USER_ERROR';
    export const FETCH_USERS_REQUEST = '@ASTRAL.FETCH_USERS_REQUEST';
    export const FETCH_USERS_SUCCESS = '@ASTRAL.FETCH_USERS_SUCCESS';
    export const FETCH_USERS_ERROR = '@ASTRAL.FETCH_USERS_ERROR';


    export const editUserRequest = (): IAction => ({
        type: EDIT_USER_REQUEST,
    });

    export const editUserError = (error): IAction => ({
        type: EDIT_USER_REQUEST,
        payload: {
            error,
        },
    });

    export const deleteUserRequest = (): IAction => ({
        type: DELETE_USER_REQUEST,
    });

    export const deleteUserSuccess = (userId: string): IAction => ({
        type: DELETE_USER_SUCCESS,
        payload: {
            userId,
        },
    });

    export const deleteUserError = (error): IAction => ({
        type: DELETE_USER_REQUEST,
        payload: {
            error,
        },
    });

    export const fetchUserRequest = (userId: string): IAction => ({
        type: FETCH_USERS_REQUEST,
        payload: {
            userId,
        },
    });

    export const fetchUserSuccess = (user: IUser): IAction => ({
        type: FETCH_USER_SUCCESS,
        payload: {
            user,
        },
    });

    export const fetchUserError = (userId: string, error: any): IAction => ({
        type: FETCH_USERS_ERROR,
        payload: {
            userId,
            error,
        },
    });

    export const fetchUsersRequest = (): IAction => ({
        type: FETCH_USERS_REQUEST,
    });

    export const fetchUsersSuccess = (users: IUser[]): IAction => ({
        type: FETCH_USERS_SUCCESS,
        payload: {
            users,
        },
    });

    export const fetchUsersError = (error: any): IAction => ({
        type: FETCH_USERS_ERROR,
        payload: {
            error,
        },
    });

    export const updateUser = (user: IUser) => (dispatch, getState: () => IStore) => {
        dispatch(editUserRequest());
        return fetch('http://localhost:9000/profile/' + user.id, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                return body;
            })
            .catch(error => {
                dispatch(editUserError(error));
            });
    };

    export const deleteUser = (user: IUser) => (dispatch, getState: () => IStore) => {
        dispatch(deleteUserRequest());
        return fetch('http://localhost:9000/profile/' + user.id, {
            method: 'DELETE',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
        })
            .then(() => {
                dispatch(uiActions.closeDeleteConfirmationModal());
                return dispatch(deleteUserSuccess(user.id));
            })
            .catch(error => {
                dispatch(deleteUserError(error));
            });
    };

    export const fetchUsers = () => (dispatch, getState: () => IStore) => {
        dispatch(deleteUserRequest());

        return fetch('http://localhost:9000/profile', {
            method: 'GET',
        })
            .then(handleResponseError)
            .then(professors => {
                dispatch(fetchUsersSuccess(professors));
            })
            .catch(error => dispatch(fetchUsersError(error)));
    };

    export const fetchProfessor = (userId: string) => (dispatch, getState: () => IStore) => {
        dispatch(fetchUserRequest(userId));

        return fetch('http://localhost:9000/professor/' + userId, {
            method: 'GET',
        })
            .then(handleResponseError)
            .then(user => {
                dispatch(fetchUserSuccess(user));
            })
            .catch(error => dispatch(fetchUserError(userId, error)));
    };

    export const fetchStudent = (userId: string) => (dispatch, getState: () => IStore) => {
        dispatch(fetchUserRequest(userId));

        return fetch('http://localhost:9000/student/' + userId, {
            method: 'GET',
        })
            .then(handleResponseError)
            .then(user => {
                dispatch(fetchUserSuccess(user));
            })
            .catch(error => dispatch(fetchUserError(userId, error)));
    };

}

export default ProfileActions;