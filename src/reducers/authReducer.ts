///<reference path="../actions/loginAction.ts"/>
import {IAction} from "../../globals";
import loginAction from "../actions/loginAction";

export interface IState {
    login: {
        isLoading: boolean;
        success: boolean;
        error: boolean;
    };
}

const initialState: IState = {
        login: {
            isLoading: false,
            success: false,
            error: false,
        },
    }
;

const reducer = (state: IState = initialState, action: IAction): IState => {
    // @ts-ignore
    const {type, payload} = action;

    const SUCCESS = loginAction.FetchStates.SUCCESS;
    const ERROR = loginAction.FetchStates.ERROR;
    const REQUEST = loginAction.FetchStates.REQUEST;

    switch (type) {
        case REQUEST:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: true,
                },
            };
        case SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    success: true,
                },
            };
        case ERROR:
            return {
                ...state,
                login: {
                    ...state.login,
                    error: true,
                },
            };
        default:
            return state;
    }
};

export default reducer;