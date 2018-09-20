import { IStore } from "../reducers";
import { IAction, IProfessor } from "../../globals";


namespace topbarActions {

    export const LOG_OUT_REQUEST = '@ASTRAL.LOG_OUT_REQUEST';
    export const LOG_OUT_ERROR = '@ASTRAL.LOG_OUT_ERROR';

    export const logOutError = (error): IAction => ({
        type: LOG_OUT_ERROR,
        payload: {
            error,
        },
    });

    export const logOutRequest = (professorId: string): IAction => ({
        type: LOG_OUT_REQUEST,
        payload: {
            professorId,
        },
    });

    /**
     * This is the action that calls our back-end API to create a professor
     * It returns a Promise. All promises must have a catch statement
     * All fetches must dispatch actions whether they fail or succeed in order to update the Store state when necessary
     * @param professor The professor object to be created
     */
    export const createProfessor = (professor: IProfessor) => (dispatch, getState: () => IStore) => {
        dispatch(logOutRequest(professor.id));
        // todo esta no es la logica lol
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
                dispatch(logOutRequest(error));
            });
    };
}

export default topbarActions;