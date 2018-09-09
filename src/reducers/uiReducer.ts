import { professorActions } from "../actions";

export interface IState {
  is: {
    loading: {
      admins: boolean;
    };
    creating: {
      professor: boolean;
    };
  };
}

const initialState: IState = {
  is: {
    loading: {
      admins: false,
    },
    creating: {
      professor: false,
    },
  },
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;
  const { CREATE_PROFESSOR_REQUEST } = professorActions;

  switch (type) {
    case CREATE_PROFESSOR_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          creating: {
            ...state.is.creating,
            professor: true,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;