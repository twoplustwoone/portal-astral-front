import { IAction, IUser } from "../../globals";
import { profileActions } from "../actions";

export interface IState {
    [id: string]: IUser;
}

const initialState: IState = {};

const reducer = (state: IState = initialState, action: IAction): IState => {
    // @ts-ignore
    const { type, payload } = action;

    const { FETCH_USERS_SUCCESS, FETCH_USER_SUCCESS, DELETE_USER_SUCCESS } = profileActions;

    switch (type) {

        case DELETE_USER_SUCCESS:
            const { [payload.userId]: deleted, ...rest } = state;
            return rest;

        case FETCH_USERS_SUCCESS:
            return {
                ...payload.users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {}),
            };

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                [payload.user.id]: payload.user,
            };

        default:
            return state;
    }
};

export default reducer;