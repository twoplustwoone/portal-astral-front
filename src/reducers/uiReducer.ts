import { professorActions, uiActions } from "../actions";

export interface IState {
  is: {
    loading: {
      admins: boolean;
    };
    creating: {
      professor: boolean;
    };
    open: {
      deleteConfirmationModal: boolean;
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
    open: {
      deleteConfirmationModal: false,
    },
  },
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;
  const { CREATE_PROFESSOR_REQUEST } = professorActions;
  const { CLOSE_DELETE_CONFIRMATION_MODAL, OPEN_DELETE_CONFIRMATION_MODAL } = uiActions;

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

    case OPEN_DELETE_CONFIRMATION_MODAL:
      return {
        ...state,
        is: {
          ...state.is,
          open: {
            ...state.is.open,
            deleteConfirmationModal: true,
          },
        },
      };

    case CLOSE_DELETE_CONFIRMATION_MODAL:
      return {
        ...state,
        is: {
          ...state.is,
          open: {
            ...state.is.open,
            deleteConfirmationModal: false,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;