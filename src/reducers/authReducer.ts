import {IAction, IUser} from "../../globals";
import loginAction from "../actions/loginAction";

export interface IState {
    login: {
        isLoading: boolean;
        success: boolean;
        error: boolean;
    };
    user?: IUser;
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
                    success: false,
                    isLoading: true,
                    error: false,
                },
            };
        case SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    success: true,
                    isLoading: false,
                    error: false,
                },
                user: payload.user,
            };
        case ERROR:
            return {
                ...state,
                login: {
                    ...state.login,
                    success: false,
                    isLoading: false,
                    error: true,
                },
            };
        default:
            return state;
    }
};

export default reducer;