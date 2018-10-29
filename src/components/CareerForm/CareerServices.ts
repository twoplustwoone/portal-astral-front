/*
 All the services required for Career Request
 */

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

export const getCareerByID = (id: string): Promise<Response> => {
    const url = 'http://localhost:9000/career/' + id;
    const init: RequestInit = {
        method: 'GET',
    };
    return fetch(url, init);
};

export const getAllCareers = (): Promise<Response> => {
    const url = 'http://localhost:9000/career/';
    const init: RequestInit = {
        method: 'GET',
    };
    return fetch(url, init);
};

export const updateCareer = (career: ICareer): Promise<Response> => {
    const url = 'http://localhost:9000/career' + career.id;
    const init: RequestInit = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(career),
    };
    return fetch(url, init);
};


export const deleteCareer = (id: string): Promise<Response> => {
    const url = 'http://localhost:9000/career' + id;
    const init: RequestInit = {
        method: 'DELETE',
    };
    return fetch(url, init);
};
// export default CareerServices;
