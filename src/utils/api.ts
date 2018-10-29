/* Admin endpoints */
import session from "./session";

export const createAdmin = (admin: IAdmin): Promise<Response> => {
  const url = 'http://localhost:9000/administrator';
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(admin),
  };

  return fetch(url, init);
};

export const getAllAdmins = (): Promise<Response> => {
  const url = 'http://localhost:9000/administrator';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getAdminById = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/administrator/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateAdmin = (admin: IAdmin): Promise<Response> => {
  const url = `http://localhost:9000/administrator/${admin.id}`;
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(admin),
  };

  return fetch(url, init);
};

export const deleteAdmin = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/administrator/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Professor endpoints */
export const createProfessor = (professor: IProfessor): Promise<Response> => {
  const url = 'http://localhost:9000/professor';
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(professor),
  };

  return fetch(url, init);
};

export const getAllProfessors = (): Promise<Response> => {
  const url = 'http://localhost:9000/professor';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getProfessorById = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/professor/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateProfessor = (professor: IProfessor): Promise<Response> => {
  const url = `http://localhost:9000/professor/${professor.id}`;
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(professor),
  };

  return fetch(url, init);
};

export const deleteProfessor = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/professor/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Student endpoints */
export const createStudent = (student: IStudent): Promise<Response> => {
  const url = 'http://localhost:9000/student';
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  };

  return fetch(url, init);
};

export const getAllStudents = (): Promise<Response> => {
  const url = 'http://localhost:9000/student';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getStudentById = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/student/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateStudent = (student: IStudent): Promise<Response> => {
  const url = `http://localhost:9000/student/${student.id}`;
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  };

  return fetch(url, init);
};

export const deleteStudent = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/student/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Subject endpoints */
export const createSubject = (subject: ISubject): Promise<Response> => {
  const url = 'http://localhost:9000/subject';
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subject),
  };

  return fetch(url, init);
};

export const getAllSubjects = (): Promise<Response> => {
  const url = 'http://localhost:9000/subject';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getSubjectById = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/subject/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateSubject = (subject: ISubject): Promise<Response> => {
  const url = `http://localhost:9000/subject/${subject.id}`;
  const init: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subject),
  };

  return fetch(url, init);
};

export const deleteSubject = (id: string): Promise<Response> => {
  const url = `http://localhost:9000/subject/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Course endpoints */
export const createCourse = (course: ICourse): Promise<Response> => {
    const url = 'http://localhost:9000/course';
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    };

    return fetch(url, init);
};

export const getAllCourses = (): Promise<Response> => {
    const url = 'http://localhost:9000/course';
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const getCourseById = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/course/${id}`;
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const updateCourse = (course: ICourse): Promise<Response> => {
    const url = `http://localhost:9000/course/${course.id}`;
    const init: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    };

    return fetch(url, init);
};

export const deleteCourse = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/course/${id}`;
    const init: RequestInit = {
        method: 'DELETE',
    };

    return fetch(url, init);
};

/* Exam endpoints */

export const createExam = (exam: IExam): Promise<Response> => {
    const url = 'http://localhost:9000/exam';
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(exam),
    };

    return fetch(url, init);
};

export const getExamById = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/exam/${id}`;
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const updateExam = (exam: IExam): Promise<Response> => {
    const url = `http://localhost:9000/exam/${exam.id}`;
    const init: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(exam),
    };

    return fetch(url, init);
};

export const deleteExam = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/exam/${id}`;
    const init: RequestInit = {
        method: 'DELETE',
    };

    return fetch(url, init);
};

export const getAllExams = (): Promise<Response> => {
    const url = 'http://localhost:9000/exam';
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

/* ExamInscription endpoints */

export const createExamInscription = (examInscription: IExamInscription): Promise<Response> => {
    const url = 'http://localhost:9000/examInscription';
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(examInscription),
    };

    return fetch(url, init);
};

export const getExamInscriptionById = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/examInscription/${id}`;
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const updateExamInscription = (examInscription: IExamInscription): Promise<Response> => {
    const url = `http://localhost:9000/examInscription/${examInscription.id}`;
    const init: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(examInscription),
    };

    return fetch(url, init);
};

export const deleteExamInscription = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/examInscription/${id}`;
    const init: RequestInit = {
        method: 'DELETE',
    };

    return fetch(url, init);
};

export const getAllExamInscriptions = (): Promise<Response> => {
    const url = 'http://localhost:9000/examInscription';
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const getAllExamInscriptionsbyExamId = (id: string): Promise<Response> => {
    const url = 'http://localhost:9000//getExams/' + id;
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const getAllExamInscriptionsbyCourseId = (id: string): Promise<Response> => {
    const url = 'http://localhost:9000/getExamInscriptionByCourse/' + id;
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};
/* Authentication endpoints */

export const login = (credentials: ILogin): Promise<Response> => {
  const url = `http://localhost:9000/login`;
  const body = { ...credentials };

  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return fetch(url, init);
};

export const logout = (): Promise<Response | null> => {
  const maybeUser: IUser | null = session.getUser();

  if (maybeUser) {
    debugger;
    const url = `http://localhost:9000/logout/${maybeUser.id}`;
    const init: RequestInit = {
      method: 'GET',
    };
    return fetch(url, init);
  }

  return Promise.resolve(null);
};