import { IStore } from "../reducers";
import {IAction, IProfessor} from "../../globals";


namespace ProfessorActions {

  export const CREATE_PROFESSOR_REQUEST = '@ASTRAL.CREATE_PROFESSOR_REQUEST';
  export const EDIT_PROFESSOR_REQUEST = '@ASTRAL.EDIT_PROFESSOR_REQUEST';
  export const DELETE_PROFESSOR_REQUEST = '@ASTRAL.DELETE_PROFESSOR_REQUEST';

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

  export const deleteProfessorError = (error): IAction => ({
      type: DELETE_PROFESSOR_REQUEST,
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
    console.log('Create professor.');
    dispatch(createProfessorRequest());
    professor.file = "";
      return fetch('http://localhost:9000/professor', {
          method: 'POST',
          body: JSON.stringify(professor),
          headers: {'content-type': 'application/json'},
      })
          .then(function(response) {
              return response
          }).then(function(body) {
              console.log(body);
      })
      .catch(error => {
        dispatch(createProfessorError(error));
      });
  };

  export const editProfessor = (professor: IProfessor) => (dispatch, getState: () => IStore) => {
      console.log('Edit professor.');
      dispatch(editProfessorRequest());
      const id = localStorage.getItem("professorId");
      console.log("Edit id: "+ id);
      return fetch('http://localhost:9000/professor/' + id, {
          method: 'PUT',
          body: JSON.stringify(professor),
          headers: {'content-type': 'application/json'},
      })
          .then(function(response) {
              console.log("editing...");
              console.log(response);
              return response.json()
          }).then(function(body) {
              console.log(body);
          })
          .catch(error => {
              dispatch(editProfessorError(error));
          });
  };

  export const deleteProfessor = (professor: IProfessor) => (dispatch, getState: () => IStore) => {
      console.log('Delete professor.');
      dispatch(deleteProfessorRequest());
      const id = localStorage.getItem("professorId");
      //el id esta siendo undefined
      return fetch('http://localhost:9000/professor/' + id, {
          method: 'DELETE',
          body: JSON.stringify(professor),
          headers: {'content-type': 'application/json'},
      })
          .then(function(response) {
              console.log("deleting...");
              console.log(response);
              return response.json()
          }).then(function(body) {
              console.log(body);
          })
          .catch(error => {
              dispatch(deleteProfessorError(error));
          });
  };

  export const getProfessors = () => (dispatch, getState: () => IStore) => {
    // TODO implement get
  }
}

export default ProfessorActions;