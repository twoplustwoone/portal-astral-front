import {professorActions, studentActions, uiActions} from "../actions";
import {IAction} from "../../globals";

export interface IState {
  is: {
    loading: {
      admins: boolean;
      students: boolean;
      professors: boolean;
    };
    creating: {
      professor: boolean;
      student: boolean;
    };
    deleting: {
      professor: boolean;
      student: boolean;
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
      students: false,
      professors: false,
    },
    creating: {
      professor: false,
      student: false,
    },
    deleting: {
      professor: false,
      student: false,
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
  const { CREATE_STUDENT_REQUEST } = studentActions;
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

      case CREATE_STUDENT_REQUEST:
          return {
              ...state,
              is: {
                  ...state.is,
                  creating: {
                      ...state.is.creating,
                      student: true,
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