const getBody = (response: Response) => response.json();

/* Admin endpoints */
export const createAdmin = (admin: IAdmin): Promise<IAdmin[]> => {
  const url = 'http://localhost:3000/administrator';
  const init: RequestInit = {
    method: 'POST',
    body: JSON.stringify(admin),
  };

  return fetch(url, init).then(getBody);
};

export const getAllAdmins = (): Promise<IAdmin[]> => {
  const url = 'http://localhost:3000/administrator';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const getAdminById = (id: string): Promise<IAdmin[]> => {
  const url = `http://localhost:3000/administrator/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const updateAdmin = (admin: IAdmin): Promise<IAdmin> => {
  const url = `http://localhost:3000/administrator/${admin.id}`;
  const init: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(admin),
  };

  return fetch(url, init).then(getBody);
};

export const deleteAdmin = (id: string): Promise<string> => {
  const url = `http://localhost:3000/administrator/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init).then(getBody);
};

/* Professor endpoints */
export const createProfessor = (professor: IProfessor): Promise<IProfessor[]> => {
  const url = 'http://localhost:3000/professor';
  const init: RequestInit = {
    method: 'POST',
    body: JSON.stringify(professor),
  };

  return fetch(url, init).then(getBody);
};

export const getAllProfessors = (): Promise<IProfessor[]> => {
  const url = 'http://localhost:3000/professor';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const getProfessorById = (id: string): Promise<IProfessor[]> => {
  const url = `http://localhost:3000/professor/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const updateProfessor = (professor: IProfessor): Promise<IProfessor> => {
  const url = `http://localhost:3000/professor/${professor.id}`;
  const init: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(professor),
  };

  return fetch(url, init).then(getBody);
};

export const deleteProfessor = (id: string): Promise<string> => {
  const url = `http://localhost:3000/professor/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init).then(getBody);
};

/* Student endpoints */
export const createStudent = (student: IStudent): Promise<IStudent[]> => {
  const url = 'http://localhost:3000/student';
  const init: RequestInit = {
    method: 'POST',
    body: JSON.stringify(student),
  };

  return fetch(url, init).then(getBody);
};

export const getAllStudents = (): Promise<IStudent[]> => {
  const url = 'http://localhost:3000/student';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const getStudentById = (id: string): Promise<IStudent[]> => {
  const url = `http://localhost:3000/student/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const updateStudent = (student: IStudent): Promise<IStudent> => {
  const url = `http://localhost:3000/student/${student.id}`;
  const init: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(student),
  };

  return fetch(url, init).then(getBody);
};

export const deleteStudent = (id: string): Promise<string> => {
  const url = `http://localhost:3000/student/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init).then(getBody);
};

/* Subject endpoints */
export const createSubject = (subject: ISubject): Promise<ISubject[]> => {
  const url = 'http://localhost:3000/subject';
  const init: RequestInit = {
    method: 'POST',
    body: JSON.stringify(subject),
  };

  return fetch(url, init).then(getBody);
};

export const getAllSubjects = (): Promise<ISubject[]> => {
  const url = 'http://localhost:3000/subject';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const getSubjectById = (id: string): Promise<ISubject[]> => {
  const url = `http://localhost:3000/subject/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init).then(getBody);
};

export const updateSubject = (subject: ISubject): Promise<ISubject> => {
  const url = `http://localhost:3000/subject/${subject.id}`;
  const init: RequestInit = {
    method: 'PUT',
    body: JSON.stringify(subject),
  };

  return fetch(url, init).then(getBody);
};

export const deleteSubject = (id: string): Promise<string> => {
  const url = `http://localhost:3000/subject/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init).then(getBody);
};

/* Authentication endpoints */

export const login = (credentials: ILogin): Promise<ILoginResponse> => {
  const url = `http://localhost:3000/login`;
  const body = { ...credentials };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const init: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  return fetch(url, init).then(getBody);
};

export const logout = (): Promise<string | null> => {
  const maybeUserAsString: string | null = window.sessionStorage.getItem('user');

  if (maybeUserAsString) {
    const user: IUser = JSON.parse(maybeUserAsString);
    const url = `http://localhost:3000/logout/${user.id}`;
    const init: RequestInit = {
      method: 'GET',
    };
    return fetch(url, init).then(getBody);
  }

  return Promise.resolve(null);
};