export interface IProps {
}

export interface IState {
  courseBeingDeleted: ICourse | null;
  courses: ICourse[];
  isDeleting: boolean;
  redirect: string;
  isMyCourses: boolean;
}