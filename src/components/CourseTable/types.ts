/* Totality of props received. Usually left empty */
import { ICourse } from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
    userType: any;
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
  onClickEditCourse: (courseId: string) => any;
  onClickDeleteCourse: (courseId: string) => any;
  onCloseDelete: () => any;
  onConfirmDelete: (course: ICourse) => any;
  onClickAddNewCourse: () => any;
  onFetchCourses: () => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
  courses: ICourse[];
  isDeleteConfirmationOpen: boolean;
  isDeletingCourse: boolean;
  isLoading: boolean;
}

export interface IContainerProps {
  match: {
    params: {
      id: string;
    };
  };
  history: any;
}

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
  courseBeingDeleted?: ICourse;
}