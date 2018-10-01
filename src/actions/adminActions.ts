import {IStore} from "../reducers";
import {IAction, IAdmin, WebData} from "../../globals";
import axios from 'axios';
import {success, failure} from "@devexperts/remote-data-ts";

const baseUrl: string = "http://localhost:9000";

namespace AdminActions {
    export const enum AdminActionsTypes {
        RequestAll = '@@admins/FETCH_ADMINS',
        RequestAllResponse = '@@admins/FETCH_ADMINS_RESPONSE',
        Delete = '@@admins/DELETE_ADMIN',
        DeleteResponse = '@@admins/DELETE_ADMIN_RESPONSE',
    }

    export const createAdminsResponse = (admins: WebData<Array<IAdmin>>): IAction => ({
        type: AdminActionsTypes.RequestAllResponse,
        payload: {
            admins,
        },
    });

    export const deleteAdminResponse = (res: { id: string, result: boolean }): IAction => ({
        type: AdminActionsTypes.DeleteResponse,
        payload: {
            res,
        },
    });

    export const getAdmins = () => (dispatch, getState: () => IStore) => {
        return axios.get<Array<IAdmin>>(baseUrl + '/administrator')
            .then(res => dispatch(createAdminsResponse(success(res.data))))
            .catch(err => dispatch(createAdminsResponse(failure(err.toString()))))
    };

    export const deleteAdmin = (id: string) => (dispatch, getState: () => IStore) => {
        return axios.delete(baseUrl + 'administrator/' + id)
            .then(res => dispatch(deleteAdminResponse({id: id, result: true})))
            .catch(err => dispatch(deleteAdminResponse({id: id, result: false})))
    }
}

export default AdminActions;