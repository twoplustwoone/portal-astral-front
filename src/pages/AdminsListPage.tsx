import * as React from "react";
import {Admin, WebData} from "../../globals";
import {success} from "@devexperts/remote-data-ts";
import AdminsTable from "../components/AdminsTable/AdminsTable";

const dummyAdmin: Admin = {
    id: "id",
    firstNames: "first names",
    lastNames: "last names",
    email: "user@provider.com",
};

export interface AdminsState {
    readonly admins: WebData<Admin[]>
}

const model: AdminsState = {
    admins: success([dummyAdmin, dummyAdmin, dummyAdmin]),
};

class AdminListPage extends React.Component {
    public render() {
        return (
            <div>
                <div>
                    {
                        model.admins.foldL(
                            () => <p>Pending request</p>,
                            () => <p>Loading</p>,
                            err => <p>Error!</p>,
                            admins => AdminsTable(admins),
                        )
                    }
                </div>
            </div>
        )
    }
}

export default AdminListPage;