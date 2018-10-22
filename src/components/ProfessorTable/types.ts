export interface IProps {
}

export interface IState {
  professorBeingDeleted: IProfessor | null;
  professors: IProfessor[];
  isDeleting: boolean;
}