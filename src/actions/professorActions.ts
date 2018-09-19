import { IStore } from "../reducers";
import { IAction, IProfessor } from "../../globals";
import handleResponseError from "../domains/handleResponseError";
import { uiActions } from "./index";


namespace ProfessorActions {

  export const CREATE_PROFESSOR_REQUEST = '@ASTRAL.CREATE_PROFESSOR_REQUEST';
  export const EDIT_PROFESSOR_REQUEST = '@ASTRAL.EDIT_PROFESSOR_REQUEST';
  export const DELETE_PROFESSOR_REQUEST = '@ASTRAL.DELETE_PROFESSOR_REQUEST';
  export const FETCH_PROFESSORS_REQUEST = '@ASTRAL.FETCH_PROFESSORS_REQUEST';
  export const FETCH_PROFESSORS_SUCCESS = '@ASTRAL.FETCH_PROFESSORS_SUCCESS';
  export const FETCH_PROFESSORS_ERROR = '@ASTRAL.FETCH_PROFESSORS_ERROR';
  export const FETCH_PROFESSOR_REQUEST = '@ASTRAL.FETCH_PROFESSOR_REQUEST';
  export const FETCH_PROFESSOR_SUCCESS = '@ASTRAL.FETCH_PROFESSOR_SUCCESS';
  export const FETCH_PROFESSOR_ERROR = '@ASTRAL.FETCH_PROFESSOR_ERROR';
  export const DELETE_PROFESSOR_SUCCESS = '@ASTRAL.DELETE_PROFESSOR_SUCCESS';

  export const createProfessorRequest = (): IAction => ({
    type: CREATE_PROFESSOR_REQUEST,
  });

  export const editProfessorRequest = (): IAction => ({
    type: EDIT_PROFESSOR_REQUEST,
  });

  export const createProfessorError = (error): IAction => ({
    type: CREATE_PROFESSOR_REQUEST,
    payload: {
      error,
    },
  });

  export const editProfessorError = (error): IAction => ({
    type: EDIT_PROFESSOR_REQUEST,
    payload: {
      error,
    },
  });

  export const deleteProfessorRequest = (): IAction => ({
    type: DELETE_PROFESSOR_REQUEST,
  });

  export const deleteProfessorSuccess = (professorId: string): IAction => ({
    type: DELETE_PROFESSOR_SUCCESS,
    payload: {
      professorId,
    },
  });

  export const deleteProfessorError = (error): IAction => ({
    type: DELETE_PROFESSOR_REQUEST,
    payload: {
      error,
    },
  });

  export const fetchProfessorRequest = (professorId: string): IAction => ({
    type: FETCH_PROFESSOR_REQUEST,
    payload: {
      professorId,
    },
  });

  export const fetchProfessorSuccess = (professor: IProfessor): IAction => ({
    type: FETCH_PROFESSOR_SUCCESS,
    payload: {
      professor,
    },
  });

  export const fetchProfessorError = (professorId: string, error: any): IAction => ({
    type: FETCH_PROFESSOR_ERROR,
    payload: {
      professorId,
      error,
    },
  });

  export const fetchProfessorsRequest = (): IAction => ({
    type: FETCH_PROFESSORS_REQUEST,
  });

  export const fetchProfessorsSuccess = (professors: IProfessor[]): IAction => ({
    type: FETCH_PROFESSORS_SUCCESS,
    payload: {
      professors,
    },
  });

  export const fetchProfessorsError = (error: any): IAction => ({
    type: FETCH_PROFESSORS_ERROR,
    payload: {
      error,
    },
  });

  /**
   * This is the action that calls our back-end API to create a professor
   * It returns a Promise. All promises must have a catch statement
   * All fetches must dispatch actions whether they fail or succeed in order to update the Store state when necessary
   * @param professor The professor object to be created
   */
  export const createProfessor = (professor: IProfessor) => (dispatch, getState: () => IStore) => {
    dispatch(createProfessorRequest());
    professor.file = "";
    return fetch('http://localhost:9000/professor', {
      method: 'POST',
      body: JSON.stringify(professor),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response
      }).then(function (body) {
        console.log(body);
      })
      .catch(error => {
        dispatch(createProfessorError(error));
      });
  };

  export const editProfessor = (professor: IProfessor) => (dispatch, getState: () => IStore) => {
    dispatch(editProfessorRequest());
    return fetch('http://localhost:9000/professor/' + professor.id, {
      method: 'PUT',
      body: JSON.stringify(professor),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        console.log("editing...");
        console.log(response);
        return response.json()
      }).then(function (body) {
        console.log(body);
      })
      .catch(error => {
        dispatch(editProfessorError(error));
      });
  };

  export const deleteProfessor = (professor: IProfessor) => (dispatch, getState: () => IStore) => {
    dispatch(deleteProfessorRequest());
    return fetch('http://localhost:9000/professor/' + professor.id, {
      method: 'DELETE',
      body: JSON.stringify(professor),
      headers: { 'content-type': 'application/json' },
    })
      .then(() => {
        dispatch(uiActions.closeDeleteConfirmationModal());
        dispatch(deleteProfessorSuccess(professor.id));
      })
      .catch(error => {
        dispatch(deleteProfessorError(error));
      });
  };

  export const fetchProfessors = () => (dispatch, getState: () => IStore) => {
    dispatch(fetchProfessorsRequest());

    return fetch('http://localhost:9000/professor', {
      method: 'GET',
    })
      .then(handleResponseError)
      .then(professors => {
        dispatch(fetchProfessorsSuccess(professors));
      })
      .catch(error => dispatch(fetchProfessorsError(error)));
  };

  export const fetchProfessor = (professorId: string) => (dispatch, getState: () => IStore) => {
    dispatch(fetchProfessorRequest(professorId));

    return fetch('http://localhost:9000/professor/' + professorId, {
      method: 'GET',
    })
      .then(handleResponseError)
      .then(professor => {
        dispatch(fetchProfessorSuccess(professor));
      })
      .catch(error => dispatch(fetchProfessorError(professorId, error)));
  };

}

export default ProfessorActions;