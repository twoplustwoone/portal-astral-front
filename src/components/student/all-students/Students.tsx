import * as React from 'react';
import {Paper, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";
import {Student} from "../student-model";
import { DeleteOutline, Edit } from '@material-ui/icons';

const styles = require('./Student.pcss');

const StudentTable: React.SFC<Student[]> = (students) => {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {students.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell><Edit className={styles.button}/></TableCell>
                                <TableCell><DeleteOutline className={styles.button}/></TableCell>
                            </TableRow>
                        );
                    })}

                </TableBody>
            </Table>
        </Paper>
    );
};
export default StudentTable;