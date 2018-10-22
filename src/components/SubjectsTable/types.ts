export interface IProps {
}

export interface IState {
  searchString: string;
  subjectBeingDeleted: ISubject | null;
  subjects: ISubject[];
  isDeleting: boolean;
}