import { professorActions, studentActions, uiActions, courseActions } from "../actions";
import { IAction } from "../../globals";

export interface IState {
  is: {
    loading: {
      admins: boolean;
      students: boolean;
      courses: boolean;
      professors: boolean;
    };
    fetching: {
      professor: { [professorId: string]: boolean; };
      student: { [studentId: string]: boolean; };
      course: { [courseId: string]: boolean; };
      admin: { [adminId: string]: boolean; };
    }
    creating: {
      professor: boolean;
      course: boolean;
      student: boolean;
    };
    deleting: {
      professor: boolean;
      course: boolean;
      student: boolean;
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
      courses: false,
      professors: false,
    },
    fetching: {
      professor: {},
      student: {},
      course: {},
      admin: {},
    },
    creating: {
      professor: false,
      course: false,
      student: false,
    },
    deleting: {
      professor: false,
      course: false,
      student: false,
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
  const { CREATE_COURSE_REQUEST, FETCH_COURSES_ERROR, FETCH_COURSES_REQUEST, FETCH_COURSES_SUCCESS, FETCH_COURSE_ERROR, FETCH_COURSE_REQUEST, FETCH_COURSE_SUCCESS, DELETE_COURSE_SUCCESS, DELETE_COURSE_REQUEST } = courseActions;

  switch (type) {
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

      case DELETE_COURSE_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          deleting: {
            ...state.is.deleting,
            course: true,
          },
        },
      };

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          deleting: {
            ...state.is.deleting,
            course: false,
          },
        },
      };

    case CREATE_COURSE_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          creating: {
            ...state.is.creating,
            course: true,
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
      case FETCH_COURSES_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            courses: true,
          },
        },
      };

    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            courses: false,
          },
        },
      };

    case FETCH_COURSES_ERROR:
      return {
        ...state,
        is: {
          ...state.is,
          loading: {
            ...state.is.loading,
            courses: false,
          },
        },
      };

    case FETCH_COURSE_REQUEST:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            course: {
              ...state.is.fetching.course,
              [payload.courseId]: true,
            },
          },
        },
      };

    case FETCH_COURSE_SUCCESS:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            course: {
              ...state.is.fetching.course,
              [payload.course.id]: false,
            },
          },
        },
      };

    case FETCH_COURSE_ERROR:
      return {
        ...state,
        is: {
          ...state.is,
          fetching: {
            ...state.is.fetching,
            course: {
              ...state.is.fetching.course,
              [payload.courseId]: false,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;