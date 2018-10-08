export type Props = {};

export type State = {
  profile?: IUser,
  fields: Fields,
  isEditing: boolean,
  showPassword: boolean,
  errors: Errors,
};

export type Fields = {
  name: string,
  lastName: string,
  email: string,
  birthday?: string,
  address?: string,
  identification: string,
  identificationType: string,
  password: string,
  file?: string;
  id: string,
};

export type Errors = {
  [p in keyof Fields]?: boolean
};