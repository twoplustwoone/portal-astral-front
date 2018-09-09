declare interface IAction {
  type: string;
  payload?: any;
}

declare interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  password?: string;
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

declare interface ICareer {

}