import * as React from 'react';
import {Paper, Table, TableHead, TableRow, TableBody, TableCell, Button, Grid} from "@material-ui/core";
import {Add, DeleteOutline, Edit} from '@material-ui/icons';
import {IAdmin, WebData} from "../../../globals";
import * as h from 'react-hyperscript'
import {Link} from 'react-router-dom'
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


const AdminsTableView: React.SFC<WebData<Array<IAdmin>>> = (remoteAdmins) => {

    return (
        h('div', {}, [
            h(Link, {to: "/new-admin", style: {float: 'right'}},
                h(Button, {variant: "fab", color: "primary"},
                    h(Add),
                ),
            ),
            h(Grid, {},
                remoteAdmins.foldL(
                    () => h(CircularProgress),
                    () => h(CircularProgress),
                    err => h('p', 'Error!'),
                    admins => adminsTable(admins),
                ),
            ),
        ])
    )
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



