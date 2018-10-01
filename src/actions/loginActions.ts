import {IStore} from "../reducers";
import {IAction, IUser} from "../../globals";
import handleResponseError from "../domains/handleResponseError";

namespace loginAction {

    export const enum FetchStates {
        SUCCESS = '@ASTRAL.FETCH_SUCCESS',
        REQUEST = '@ASTRAL.FETCH_REQUEST',
        ERROR = '@ASTRAL.FETCH_ERROR',
    }

    export const enum UserType {
        PROFESSOR, ADMINISTRATOR, STUDENT,
    }

    export const fetchRequest = (email: string, password: string): IAction => ({
        type: FetchStates.REQUEST,
        payload: {
            email,
            password,
        },
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

    export const logIn = (user: IUser) => (dispatch, getState: () => IStore) => {
        dispatch(fetchRequest(user.email,user.password));

        return fetch('http://localhost:9000/login/'+user, {
            method: 'GET',
        }) //Review path route
            .then(handleResponseError)
            .then(userLogged => {
                dispatch(fetchSuccess(userLogged));
            })
            .catch(error => dispatch(fetchError(error)));
    };

    export const loggedUser = {
        name: "Sebas",
        lastName: "Belaustegui",
        email: "sebas@mail.com",
        id: "AA22",
        password: "password",
        userType: UserType.ADMINISTRATOR,
    }

    export const isAuthenticated = true;    //TODO implement method

    // export const logOut = ():
}

export default loginAction;