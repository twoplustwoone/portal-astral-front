declare interface IAction {
  type: string;
  payload?: any;
}

declare interface IUser {
  name: string;
  lastName: string;
  email: string;
  id: string;
  password: string;
  userType?: UserType;
  file?: string;
}

declare interface IProfessor extends IUser {
}

declare interface IAdmin extends IUser {
}

declare interface IStudent extends IUser {
  birthday: string;
  identificationType: string;
  identification: string;
  address?: string;
  career?: ICareer;
}

declare interface ICareer {
  id: string;
}

declare interface ISubject {
  id: string;
  subjectName: string;
  careerYear: number;
  requiredSubjects: string[];
  students: string[];
}

declare interface ICourse {
  id: string;
  startDate: string;
  endDate: string;
  subject: ISubject;
  schedule: string[];
  enrolled: IStudent[];
}

declare interface ICareer {
  id: string;
  careerName: string;
  careerSubjects: string[];
  students: IStudent;
}

declare interface IExam {
    id: string;
    course: ICourse;
    date: string;
}

declare interface IStudentExam{
    id: string;
    exam: IExam;
    date: string;
    student: IStudent;
    result: number;
}

declare type UserType = 'Professor' | 'Admin' | 'Student';

declare interface ILogin {
  email: string;
  password: string;
}

declare interface ILoginResponse {
  Type: UserType,
  User: IUser,
}