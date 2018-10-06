import {IAction, ICourse} from "../../globals";
import coursesActions from "../actions/coursesActions";

export interface IState {
    courses: ICourse[],
    states: {
        isLoading: boolean,
        success: boolean,
        error: boolean,
    }
}

const initialState: IState = {
    states: {
        isLoading: false,
        success: false,
        error: false,
    },
    courses: [],
};
const reducer = (state: IState = initialState, action: IAction): IState => {
    const {type, payload} = action;

    const SUCCESS_FETCH_ALL_PAST = coursesActions.CourseTypes.SUCCESS_FETCH_ALL_PAST;
    const SUCCESS_UPDATE = coursesActions.CourseTypes.SUCCESS_UPDATE;
    const SUCCESS_DELETE = coursesActions.CourseTypes.SUCCESS_DELETE;
    const ERROR = coursesActions.CourseTypes.ERROR;
    const REQUEST = coursesActions.CourseTypes.REQUEST_FETCH_ALL_PAST;

    switch (type) {
        case REQUEST:
            return {
                ...state,
                states: {
                    ...state.states,
                    success: false,
                    isLoading: true,
                    error: false,
                },
                courses: [],
            };
        case SUCCESS_FETCH_ALL_PAST:
            return {
                ...state,
                states: {
                    ...state.states,
                    success: true,
                    isLoading: false,
                    error: false,
                },
                courses: payload.pastCourses,
            };

        case SUCCESS_UPDATE:
            return {
                ...state,
                states: {
                    ...state.states,
                    success: true,
                    isLoading: false,
                    error: false,
                },
                courses: payload.pastCourses,
            };

        case SUCCESS_DELETE:
            return {
                ...state,
                states: {
                    ...state.states,
                    success: true,
                    isLoading: false,
                    error: false,
                },
                courses: payload.pastCourses,
            };
        case ERROR:
            return {
                ...state,
                states: {
                    ...state.states,
                    success: false,
                    isLoading: false,
                    error: true,
                },
                courses : [],
            };
        default:
            return state;
    }
};

export default reducer;