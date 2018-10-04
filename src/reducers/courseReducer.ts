import {IAction} from "../../globals";
import courseActions from "../actions/courseActions";

export interface IState {
}

const initialState: IState = {};

const reducer = (state: IState = initialState, action: IAction): IState => {
    // @ts-ignore
    const { type, payload } = action;

    const { FETCH_SUBJECTS_SUCCESS } = courseActions;

    switch (type) {

        case FETCH_SUBJECTS_SUCCESS:
            return {
                ...payload.subjects.reduce((acc, subject) => ({ ...acc, [subject.id]: subject }), {}),
            };

        default:
            return state;
    }
};

export default reducer;