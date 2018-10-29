export interface IProps {
}

export interface IState {
  examBeingDeleted: IExam | null;
  exams: IExam[];
  isDeleting: boolean;
  examsStudent?: IStudentExam[];
}