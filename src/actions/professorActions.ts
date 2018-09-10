import { IStore } from "../reducers";


namespace ProfessorActions {

  export const CREATE_PROFESSOR_REQUEST = '@ASTRAL.CREATE_PROFESSOR_REQUEST';

  export const createProfessorRequest = (): IAction => ({
    type: CREATE_PROFESSOR_REQUEST,
  });

  export const createProfessorError = (error): IAction => ({
    type: CREATE_PROFESSOR_REQUEST,
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

    return fetch(`/professor`, {
      method: 'POST',
      body: JSON.stringify(professor),
    })
      .then(response => {
        /* TODO stream the response to treat it as a user-friendly JSON */
        /* TODO dispatch the create success */
      })
      .catch(error => {
        dispatch(createProfessorError(error));
      });
  };

  export const deleteProfessor = (professor: IProfessor) => (dispatch, getState: () => IStore) => {
    // TODO implement delete
  };

  export const getProfessors = () => (dispatch, getState: () => IStore) => {
    // TODO implement get
  }
}

export default ProfessorActions;