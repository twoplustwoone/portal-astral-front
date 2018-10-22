export interface IProps {
}

export interface IState {
  studentBeingDeleted: IStudent | null;
  students: IStudent[];
  isDeleting: boolean;
}