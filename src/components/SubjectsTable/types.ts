export interface IProps {
}

export interface IState {
  subjectBeingDeleted: ISubject | null;
  subjects: ISubject[];
  isDeleting: boolean;
}