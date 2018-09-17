import { professorActions, uiActions } from "../actions";
import {IAction} from "../../globals";

export interface IState {
  is: {
    loading: {
      admins: boolean;
      students: boolean;
    };
    creating: {
      professor: boolean;
    };
    open: {
      deleteConfirmationModal: boolean;
      loadingModal: boolean;
    };
  };
}

const initialState: IState = {
  is: {
    loading: {
      admins: false,
      students: false,
    },
    creating: {
      professor: false,
    },
    open: {
      deleteConfirmationModal: false,
      loadingModal: false,
    },
  },
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;
  const { CREATE_PROFESSOR_REQUEST } = professorActions;
  const { CLOSE_DELETE_CONFIRMATION_MODAL, OPEN_DELETE_CONFIRMATION_MODAL,
          OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL} = uiActions;

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

    case OPEN_LOADING_MODAL:
        return {
            ...state,
            is: {
                ...state.is,
                open: {
                    ...state.is.open,
                    loadingModal: true,
                },
            },
        };

    case CLOSE_LOADING_MODAL:
        return {
            ...state,
            is: {
                ...state.is,
                open: {
                    ...state.is.open,
                    loadingModal: false,
                },
            },
        };

    default:
      return state;
  }
};

export default reducer;