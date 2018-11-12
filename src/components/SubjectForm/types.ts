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
  isNew: boolean;
  isEditing: boolean;
  isFetching: boolean;
  isDeleting: boolean;
  isCreating: boolean;
  redirect?: string;
  subject?: ISubject;
  isDeleteModalOpen: boolean;
  allSubjects: ISubject[];
}

export interface IFields {
  subjectName: string;
  id: string;
  careerYear: number;
  requiredSubjects: string[];
  courseProfessors: string[];
  students: string[];
}

export type IErrors = {
  [p in keyof IFields]?: boolean
};