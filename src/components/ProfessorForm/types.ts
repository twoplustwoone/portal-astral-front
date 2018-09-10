/* Totality of props received. Usually left empty */
import {IProfessor} from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
  onSubmit: (professor: IProfessor) => any;
  onCancel: () => any;
  onClickDelete: (professor: IProfessor) => any;
  onCloseDelete: () => any;
  onConfirmDelete: (professor: IProfessor) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
  professor?: IProfessor;
  isDeleteConfirmationOpen: boolean;
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
}

export type IErrors = {
  [p in keyof IFields]?: boolean
};