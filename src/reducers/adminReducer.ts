import {IAction, IAdmin, WebData} from "../../globals";
import {initial, pending} from "@devexperts/remote-data-ts";
import AdminActions from "../actions/adminActions";

export interface IState {
    admins: WebData<Array<IAdmin>>;
}

const initialState: IState = {
    admins: initial,
};

const reducer = (state: IState = initialState, action: IAction): IState => {
    const {type, payload} = action;

    switch (type) {
        case AdminActions.AdminActionsTypes.RequestAll:
            return {...state, admins: pending};
        case AdminActions.AdminActionsTypes.RequestAllResponse:
            return {...state, admins: payload.admins};
        default:
            return state;
    }
};

export default reducer;