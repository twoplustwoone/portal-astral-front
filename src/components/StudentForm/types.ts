/* Totality of props received. Usually left empty */
export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
  onCreate: (student: IStudent) => any;
  onEdit: (student: IStudent) => any;
  onCancel: () => any;
  onClickDelete: (student: IStudent) => any;
  onCloseDelete: () => any;
  onConfirmDelete: (student: IStudent) => any;
  onFetchStudent: (studentId: string) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
  student?: IStudent;
  isDeleteConfirmationOpen: boolean;
  isFetchingStudent: boolean;
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
  lastName: string;
  email: string;
  password: string;
  id: string;
  file?: string;
  birthday: string;
  identificationType: string;
  identification: string;
  address?: string;
  careerId: string;
}

export type IErrors = {
  [p in keyof IFields]?: boolean
};