import * as H from "history";
import { match } from "react-router";

export interface IProps {
  history: H.History;
  location: H.Location<any>;
  match: match<any>;
};

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
  fields: IFields;
  errors: IErrors;
  showPassword: boolean;
  isNew: boolean;
  isEditing: boolean;
  isFetching: boolean;
  isDeleting: boolean;
  isCreating: boolean;
  redirect?: string;
  student?: IStudent;
  isDeleteModalOpen: boolean;
  careers: ICareer[];
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
  career?: ICareer;
  address?: string;
}

export type IErrors = {
  [p in keyof IFields]?: boolean
};