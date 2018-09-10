import * as React from 'react';
import {Paper, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";
import {DeleteOutline, Edit} from '@material-ui/icons';
import {Admin} from "../../../globals";


const AdminsTable: React.SFC<Admin[]> = (admins) => {

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Names</TableCell>
                        <TableCell>Last Names</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {admins.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.firstNames}</TableCell>
                                <TableCell>{row.lastNames}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell><Edit/></TableCell>
                                <TableCell><DeleteOutline/></TableCell>
                            </TableRow>
                        );
                    })}

                </TableBody>
            </Table>
        </Paper>
    );
};

export default AdminsTable;



