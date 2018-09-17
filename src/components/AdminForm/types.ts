/* Totality of props received. Usually left empty */
import {IProfessor} from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
  onSubmit: (professor: IProfessor) => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
}

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
  fields: IFields;
  showPassword: boolean;
  errors: IErrors;
}

export interface IFields {
  name: string;
  lastName: string;
  email: string;
  password: string;
  id: string;
}

export type IErrors = {
  [p in keyof IFields]?: boolean
};