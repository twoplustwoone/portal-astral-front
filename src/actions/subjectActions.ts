import { IStore } from "../reducers";
import { IAction, ISubject } from "../../globals";
import handleResponseError from "../domains/handleResponseError";
import { uiActions } from "./index";

namespace SubjectActions {

  export const CREATE_SUBJECT_REQUEST = '@ASTRAL.CREATE_SUBJECT_REQUEST';
  export const EDIT_SUBJECT_REQUEST = '@ASTRAL.EDIT_SUBJECT_REQUEST';
  export const DELETE_SUBJECT_REQUEST = '@ASTRAL.DELETE_SUBJECT_REQUEST';
  export const FETCH_SUBJECTS_REQUEST = '@ASTRAL.FETCH_SUBJECTS_REQUEST';
  export const FETCH_SUBJECTS_SUCCESS = '@ASTRAL.FETCH_SUBJECTS_SUCCESS';
  export const FETCH_SUBJECTS_ERROR = '@ASTRAL.FETCH_SUBJECTS_ERROR';
  export const FETCH_SUBJECT_REQUEST = '@ASTRAL.FETCH_SUBJECT_REQUEST';
  export const FETCH_SUBJECT_SUCCESS = '@ASTRAL.FETCH_SUBJECT_SUCCESS';
  export const FETCH_SUBJECT_ERROR = '@ASTRAL.FETCH_SUBJECT_ERROR';
  export const DELETE_SUBJECT_SUCCESS = '@ASTRAL.DELETE_SUBJECT_SUCCESS';

  export const createSubjectRequest = (): IAction => ({
    type: CREATE_SUBJECT_REQUEST,
  });

  export const editSubjectRequest = (): IAction => ({
    type: EDIT_SUBJECT_REQUEST,
  });

  export const createSubjectError = (error): IAction => ({
    type: CREATE_SUBJECT_REQUEST,
    payload: {
      error,
    },
  });

  export const editSubjectError = (error): IAction => ({
    type: EDIT_SUBJECT_REQUEST,
    payload: {
      error,
    },
  });

  export const deleteSubjectRequest = (): IAction => ({
    type: DELETE_SUBJECT_REQUEST,
  });

  export const deleteSubjectSuccess = (subjectId: string): IAction => ({
    type: DELETE_SUBJECT_SUCCESS,
    payload: {
      subjectId,
    },
  });

  export const deleteSubjectError = (error): IAction => ({
    type: DELETE_SUBJECT_REQUEST,
    payload: {
      error,
    },
  });

  export const fetchSubjectRequest = (subjectId: string): IAction => ({
    type: FETCH_SUBJECT_REQUEST,
    payload: {
      subjectId,
    },
  });

  export const fetchSubjectSuccess = (subject: ISubject): IAction => ({
    type: FETCH_SUBJECT_SUCCESS,
    payload: {
      subject,
    },
  });

  export const fetchSubjectError = (subjectId: string, error: any): IAction => ({
    type: FETCH_SUBJECT_ERROR,
    payload: {
      subjectId,
      error,
    },
  });

  export const fetchSubjectsRequest = (): IAction => ({
    type: FETCH_SUBJECTS_REQUEST,
  });

  export const fetchSubjectsSuccess = (subjects: ISubject[]): IAction => ({
    type: FETCH_SUBJECTS_SUCCESS,
    payload: {
      subjects,
    },
  });

  export const fetchSubjectsError = (error: any): IAction => ({
    type: FETCH_SUBJECTS_ERROR,
    payload: {
      error,
    },
  });

  /**
   * This is the action that calls our back-end API to create a subject
   * It returns a Promise. All promises must have a catch statement
   * All fetches must dispatch actions whether they fail or succeed in order to update the Store state when necessary
   * @param subject The subject object to be created
   */
  export const createSubject = (subject: ISubject) => (dispatch, getState: () => IStore) => {
    dispatch(createSubjectRequest());
    return fetch('http://localhost:9000/subject', {
      method: 'POST',
      body: JSON.stringify(subject),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        return body;
      })
      .catch(error => {
        dispatch(createSubjectError(error));
      });
  };

  export const updateSubject = (subject: ISubject) => (dispatch, getState: () => IStore) => {
    dispatch(editSubjectRequest());
    return fetch('http://localhost:9000/subject/' + subject.id, {
      method: 'PUT',
      body: JSON.stringify(subject),
      headers: { 'content-type': 'application/json' },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (body) {
        return body;
      })
      .catch(error => {
        dispatch(editSubjectError(error));
      });
  };

  export const deleteSubject = (subject: ISubject) => (dispatch, getState: () => IStore) => {
    dispatch(deleteSubjectRequest());
    return fetch('http://localhost:9000/subject/' + subject.id, {
      method: 'DELETE',
      body: JSON.stringify(subject),
      headers: { 'content-type': 'application/json' },
    })
      .then(() => {
        dispatch(uiActions.closeDeleteConfirmationModal());
        return dispatch(deleteSubjectSuccess(subject.id));
      })
      .catch(error => {
        dispatch(deleteSubjectError(error));
      });
  };

  export const fetchSubjects = () => (dispatch, getState: () => IStore) => {
    dispatch(fetchSubjectsRequest());

    return fetch('http://localhost:9000/subject', {
      method: 'GET',
    })
      .then(handleResponseError)
      .then(subjects => {
        dispatch(fetchSubjectsSuccess(subjects));
      })
      .catch(error => dispatch(fetchSubjectsError(error)));
  };

  export const fetchSubject = (subjectId: string) => (dispatch, getState: () => IStore) => {
    dispatch(fetchSubjectRequest(subjectId));

    return fetch('http://localhost:9000/subject/' + subjectId, {
      method: 'GET',
    })
      .then(handleResponseError)
      .then(subject => {
        dispatch(fetchSubjectSuccess(subject));
      })
      .catch(error => dispatch(fetchSubjectError(subjectId, error)));
  };

}

export default SubjectActions;