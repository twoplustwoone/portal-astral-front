class Session {

  login = (loginResponse: ILoginResponse): void => {
    const { User, Type } = loginResponse;
    sessionStorage.setItem('user', JSON.stringify(User));
    sessionStorage.setItem('userType', Type);
  };

  logout = (): void => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
  };

  isLogged = (): boolean => {
    return !!sessionStorage.getItem('user') && !!sessionStorage.getItem('userType');
  };

  getUser = (): IUser | null => {
    const item = sessionStorage.getItem('user');
    return item === null ? null : JSON.parse(item);
  };

  getUserType = (): UserType | null => {
    const item = sessionStorage.getItem('userType');
    return item === null ? null : item as UserType;
  }
}

const session = new Session();

export default session;