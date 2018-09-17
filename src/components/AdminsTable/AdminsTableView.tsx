import * as React from 'react';
import {Paper, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";
import {DeleteOutline, Edit} from '@material-ui/icons';
import {IAdmin, WebData} from "../../../globals";
import * as h from 'react-hyperscript'


const AdminsTableView: React.SFC<WebData<Array<IAdmin>>> = (remoteAdmins) => {

    return (
        h('div', {},
            remoteAdmins.foldL(
                () => <p>Pending request</p>,
                () => <p>Loading</p>,
                err => <p>Error!</p>,
                admins => adminsTable(admins),
            ))
    );
};

const adminsTable = (admins: Array<IAdmin>) => {
    return h(Paper, [
        h(Table, [
            h(TableHead, [
                h(TableRow, [
                    h(TableCell, 'First Names'),
                    h(TableCell, 'Last Names'),
                    h(TableCell, 'Email'),
                    h(TableCell, ''),
                    h(TableCell, ''),
                ]),
            ]),
            h(TableBody, admins.map(adminRow)),
        ]),
    ])
};

const adminRow = (admin: IAdmin) => {
    return (
        <TableRow key={admin.id}>
            <TableCell>{admin.name}</TableCell>
            <TableCell>{admin.lastName}</TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell><Edit/></TableCell>
            <TableCell><DeleteOutline/></TableCell>
        </TableRow>
    );
};

export default AdminsTableView;



