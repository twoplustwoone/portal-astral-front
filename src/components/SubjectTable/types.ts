/* Totality of props received. Usually left empty */
import { ISubject } from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
  onClickEditSubject: (subjectId: string) => any;
  onClickDeleteSubject: (subjectId: string) => any;
  onCloseDelete: () => any;
  onConfirmDelete: (subject: ISubject) => any;
  onClickAddNewSubject: () => any;
  onFetchSubjects: () => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
  subjects: ISubject[];
  isDeleteConfirmationOpen: boolean;
  isDeletingSubject: boolean;
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
  subjectBeingDeleted?: ISubject;
}