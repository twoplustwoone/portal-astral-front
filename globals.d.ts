import { RemoteData } from "@devexperts/remote-data-ts";

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

declare interface ISubject {
    subjectName: string;
    careerYear: number;
    requiredSubjects: any;
    students: any;
}

type HttpError = string
type WebData<A> = RemoteData<HttpError, A>

declare interface ICareer {
  id: string;
}

declare enum UserType {
    PROFESSOR, ADMINISTRATOR, STUDENT
}