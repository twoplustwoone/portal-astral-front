/* Admin endpoints */
import session from "./session";

export const baseUrl = 'http://localhost:9000'

export const createAdmin = (admin: IAdmin): Promise<Response> => {
  const url = baseUrl + '/administrator';
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
  const url = baseUrl + '/administrator';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getAdminById = (id: string): Promise<Response> => {
  const url = `${baseUrl}/administrator/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateAdmin = (admin: IAdmin): Promise<Response> => {
  const url = `${baseUrl}/administrator/${admin.id}`;
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
  const url = `${baseUrl}/administrator/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Professor endpoints */
export const createProfessor = (professor: IProfessor): Promise<Response> => {
  const url = baseUrl + '/professor';
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
  const url = baseUrl + '/professor';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getProfessorById = (id: string): Promise<Response> => {
  const url = `${baseUrl}/professor/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateProfessor = (professor: IProfessor): Promise<Response> => {
  const url = `${baseUrl}/professor/${professor.id}`;
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
  const url = `${baseUrl}/professor/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Student endpoints */
export const createStudent = (student: IStudent): Promise<Response> => {
  const url = baseUrl + '/student';
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
  const url = baseUrl + '/student';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getStudentById = (id: string): Promise<Response> => {
  const url = `${baseUrl}/student/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateStudent = (student: IStudent): Promise<Response> => {
  const url = `${baseUrl}/student/${student.id}`;
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
  const url = `${baseUrl}/student/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Subject endpoints */
export const createSubject = (subject: ISubject): Promise<Response> => {
  const url = baseUrl + '/subject';
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
  const url = baseUrl + '/subject';
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const getSubjectById = (id: string): Promise<Response> => {
  const url = `${baseUrl}/subject/${id}`;
  const init: RequestInit = {
    method: 'GET',
  };

  return fetch(url, init);
};

export const updateSubject = (subject: ISubject): Promise<Response> => {
  const url = `${baseUrl}/subject/${subject.id}`;
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
  const url = `${baseUrl}/subject/${id}`;
  const init: RequestInit = {
    method: 'DELETE',
  };

  return fetch(url, init);
};

/* Course endpoints */
export const createCourse = (course: ICourse): Promise<Response> => {
    const url = baseUrl + '/course';
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
    const url = baseUrl + '/course';
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const getCourseById = (id: string): Promise<Response> => {
    const url = `${baseUrl}/course/${id}`;
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const updateCourse = (course: ICourse): Promise<Response> => {
    const url = `${baseUrl}/course/${course.id}`;
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
    const url = `${baseUrl}/course/${id}`;
    const init: RequestInit = {
        method: 'DELETE',
    };

    return fetch(url, init);
};

/* Exam endpoints */

export const getAllExams = (): Promise<Response> => {
    const url = 'http://localhost:9000/exam';
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const createExam = (exam: IExam): Promise<Response> => {
    const url = baseUrl + '/exam';
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
    const url = `${baseUrl}/exam/${id}`;
    const init: RequestInit = {
        method: 'GET',
    };

    return fetch(url, init);
};

export const updateExam = (exam: IExam): Promise<Response> => {
    const url = `${baseUrl}/exam/${exam.id}`;
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
    const url = `${baseUrl}/exam/${id}`;
    const init: RequestInit = {
        method: 'DELETE',
    };

    return fetch(url, init);
};

/* Career endpoints */

export const getAllCareers = (): Promise<Response> => {
    const url = 'http://localhost:9000/career';
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
export const deleteCareer = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/career/${id}`;
    const init: RequestInit = {
        method: 'DELETE',

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

export const enrollStudentInExam = (id: string, studentId: string): Promise<Response> => {
    const url = `${baseUrl}/exam/enroll/${id}`;
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId }),
    };

    return fetch(url, init);
};

export const unenrollStudentInExam = (id: string): Promise<Response> => {
    const url = `${baseUrl}/exam/unenroll/${id}`;
    const init: RequestInit = {
        method: 'DELETE',
    };

    return fetch(url, init);
};

export const createCareer = (career: ICareer): Promise<Response> => {
    const url = 'http://localhost:9000/career';
    const init: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(career),
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


export const getCareerById = (id: string): Promise<Response> => {
    const url = `http://localhost:9000/career/${id}`;
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

export const updateCareer = (career: ICareer): Promise<Response> => {
    const url = `http://localhost:9000/career/${career.id}`;
    const init: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(career),
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
  const url = `${baseUrl}/login`;
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
    const url = `${baseUrl}/logout/${maybeUser.id}`;
    const init: RequestInit = {
      method: 'GET',
    };
    return fetch(url, init);
  }

  return Promise.resolve(null);
};