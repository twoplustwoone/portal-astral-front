import { professorActions, uiActions } from "../actions";
import { IAction } from "../../globals";
import topbarActions from "../actions/topbarActions";

export interface IState {
  is: {
    loading: {
      admins: boolean;
      students: boolean;
      professors: boolean;
    };
    fetching: {
      professor: { [professorId: string]: boolean; };
      student: { [studentId: string]: boolean; };
      admin: { [adminId: string]: boolean; };
    }
    creating: {
      professor: boolean;
    };
    open: {
      deleteConfirmationModal: boolean;
      loadingModal: boolean;
      logOutModal: boolean;
    };
    deleting: {
      professor: boolean;
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
    fetching: {
      professor: {},
      student: {},
      admin: {},
    },
    creating: {
      professor: false,
    },
    open: {
      deleteConfirmationModal: false,
      loadingModal: false,
      logOutModal: false,
    },
    deleting: {
      professor: false,
    },
  },
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  // @ts-ignore
  const { type, payload } = action;
  const { CREATE_PROFESSOR_REQUEST, FETCH_PROFESSORS_ERROR, FETCH_PROFESSORS_REQUEST, FETCH_PROFESSORS_SUCCESS, FETCH_PROFESSOR_ERROR, FETCH_PROFESSOR_REQUEST, FETCH_PROFESSOR_SUCCESS } = professorActions;
  const { CLOSE_DELETE_CONFIRMATION_MODAL, OPEN_DELETE_CONFIRMATION_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL, OPEN_LOG_OUT_MODAL, CLOSE_LOG_OUT_MODAL} = uiActions;
  const { LOG_OUT_REQUEST, LOG_OUT_ERROR} = topbarActions;

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

    case FETCH_PROFESSORS_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            professors: true,
          },
        },
      };

    case FETCH_PROFESSORS_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            professors: false,
          },
        },
      };

    case FETCH_PROFESSORS_ERROR:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            professors: false,
          },
        },
      };

    case FETCH_PROFESSOR_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            professor: {
              ...state.is.fetching.professor,
              [payload.professorId]: true,
            },
          },
        },
      };

    case FETCH_PROFESSOR_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            professor: {
              ...state.is.fetching.professor,
              [payload.professor.id]: false,
            },
          },
        },
      };

    case FETCH_PROFESSOR_ERROR:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            professor: {
              ...state.is.fetching.professor,
              [payload.professorId]: false,
            },
          },
        },
      };

      case LOG_OUT_REQUEST:
          return {
              ...state,
              is: {
                  ...state.is,
                  open: {
                      ...state.is.open,
                      logOutModal: false,
                  },
              },
          };

      case LOG_OUT_ERROR:
          return {
              ...state,
              is: {
                  ...state.is,
                  open: {
                      ...state.is.open,
                      logOutModal: false,
                  },
              },
          };

      case OPEN_LOG_OUT_MODAL:
          return {
              ...state,
              is: {
                  ...state.is,
                  open: {
                      ...state.is.open,
                      logOutModal: true,
                  },
              },
          };

      case CLOSE_LOG_OUT_MODAL:
          return {
              ...state,
              is: {
                  ...state.is,
                  open: {
                      ...state.is.open,
                      logOutModal: false,
                  },
              },
          };

    default:
      return state;
  }
};

export default reducer;