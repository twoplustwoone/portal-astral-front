/* Totality of props received. Usually left empty */
import { IProfessor } from "../../../globals";

export interface IProps extends IDispatchProps, IValueProps, IContainerProps {
}

/* These are all the functions the component will receive as props from the parent container */
export interface IDispatchProps {
  onClickEditProfessor: (professorId: string) => any;
  onClickDeleteProfessor: (professor: IProfessor) => any;
  onClickAddNewProfessor: () => any;
  onFetchProfessors: () => any;
}

/* These are all the values the component will receive as props from the parent container (strings, booleans, numbers, etc) */
export interface IValueProps {
  professors?: IProfessor[];
  isDeleteConfirmationOpen: boolean;
  isDeletingProfessor: boolean;
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
}