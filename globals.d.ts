import {RemoteData} from "@devexperts/remote-data-ts";

declare interface IAction {
  type: string;
  payload?: any;
}

declare interface IUser {
  name: string;
  lastName: string;
  email: string;
  id: string;
  password?: string;
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
  career: ICareer;
}

type HttpError = string
type WebData<A> = RemoteData<HttpError, A>


declare interface ICareer {

}