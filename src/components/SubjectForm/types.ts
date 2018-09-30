/* Totality of props received. Usually left empty */
import {ISubject} from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
  onCreate: (subject: ISubject) => any;
  onEdit: (subject: ISubject) => any;
  onCancel: () => any;
  onClickDelete: (subject: ISubject) => any;
  onCloseDelete: () => any;
  onConfirmDelete: (subject: ISubject) => any;
  onFetchSubject: (subjectId: string) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
  subject?: ISubject;
  isDeleteConfirmationOpen: boolean;
  isFetchingSubject: boolean;
  isCreating: boolean;
  isDeleting: boolean;
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
  fields: IFields;
  showPassword: boolean;
  errors: IErrors;
  isNew: boolean;
  isEditing: boolean;
}

export interface IFields {
    name: string;
    careerYear: number;
    id: string;
}

export type IErrors = {
  [p in keyof IFields]?: boolean
};