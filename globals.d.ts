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
  name: string;
  year: number;
  requiredSubjects: string[];
}

declare type UserType = {
  PROFESSOR: 'Professor',
  ADMINISTRATOR: 'Admin',
  STUDENT: 'Student',
}

declare interface ILogin {
  email: string;
  password: string;
}

declare interface ILoginResponse {
  Type: UserType,
  User: IUser,
}