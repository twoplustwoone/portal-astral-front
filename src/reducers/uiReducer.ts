import { subjectActions, professorActions, studentActions, uiActions } from "../actions";
import { IAction } from "../../globals";

export interface IState {
  is: {
    loading: {
      admins: boolean;
      students: boolean;
      professors: boolean;
      subjects: boolean;
    };
    fetching: {
      professor: { [professorId: string]: boolean; };
      student: { [studentId: string]: boolean; };
      admin: { [adminId: string]: boolean; };
      subject: { [subjectId: string]: boolean; };
    }
    creating: {
      professor: boolean;
      student: boolean;
      subject: boolean;
    };
    deleting: {
      professor: boolean;
      student: boolean;
      subject: boolean;
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
      professors: false,
      subjects: false,
    },
    fetching: {
      professor: {},
      student: {},
      admin: {},
      subject: {},
    },
    creating: {
      professor: false,
      student: false,
      subject: false,
    },
    deleting: {
      professor: false,
      student: false,
      subject: false,
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

  const { CREATE_STUDENT_REQUEST } = studentActions;
  const { CLOSE_DELETE_CONFIRMATION_MODAL, OPEN_DELETE_CONFIRMATION_MODAL, OPEN_LOADING_MODAL, CLOSE_LOADING_MODAL } = uiActions;
  const { CREATE_PROFESSOR_REQUEST, FETCH_PROFESSORS_ERROR, FETCH_PROFESSORS_REQUEST, FETCH_PROFESSORS_SUCCESS, FETCH_PROFESSOR_ERROR, FETCH_PROFESSOR_REQUEST, FETCH_PROFESSOR_SUCCESS, DELETE_PROFESSOR_SUCCESS, DELETE_PROFESSOR_REQUEST } = professorActions;
  const { CREATE_SUBJECT_REQUEST, FETCH_SUBJECTS_ERROR, FETCH_SUBJECTS_REQUEST, FETCH_SUBJECTS_SUCCESS, FETCH_SUBJECT_ERROR, FETCH_SUBJECT_REQUEST, FETCH_SUBJECT_SUCCESS, DELETE_SUBJECT_SUCCESS, DELETE_SUBJECT_REQUEST } = subjectActions;

  switch (type) {
    case DELETE_SUBJECT_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          deleting: {
            ...state.is.deleting,
            subject: true,
          },
        },
      };

    case DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          deleting: {
            ...state.is.deleting,
            subject: false,
          },
        },
      };

    case CREATE_SUBJECT_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          creating: {
            ...state.is.creating,
            subject: true,
          },
        },
      };
      case DELETE_PROFESSOR_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          deleting: {
            ...state.is.deleting,
            professor: true,
          },
        },
      };

    case DELETE_PROFESSOR_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          deleting: {
            ...state.is.deleting,
            professor: false,
          },
        },
      };

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
      case FETCH_SUBJECTS_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            subjects: true,
          },
        },
      };

    case FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            subjects: false,
          },
        },
      };

    case FETCH_SUBJECTS_ERROR:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            subjects: false,
          },
        },
      };

    case FETCH_SUBJECT_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            subject: {
              ...state.is.fetching.subject,
              [payload.subjectId]: true,
            },
          },
        },
      };

    case FETCH_SUBJECT_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            subject: {
              ...state.is.fetching.subject,
              [payload.subject.id]: false,
            },
          },
        },
      };

    case FETCH_SUBJECT_ERROR:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            subject: {
              ...state.is.fetching.subject,
              [payload.subjectId]: false,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;