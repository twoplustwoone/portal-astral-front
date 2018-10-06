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

type HttpError = string
type WebData<A> = RemoteData<HttpError, A>

declare interface ICareer {
  id: string;
}

declare interface ICourse {
    id: string;
    startTime: Date;
    endTime: Date;
    subject: ISubject;
    schedule: IDictationHours[]
}

declare interface IDictationHours {
  id: string;
  day: string;
  startTime: Date;
  endTime: Date;
}

declare interface ISubject {
  
}

declare enum UserType {
    PROFESSOR, ADMINISTRATOR, STUDENT
}