import * as React from 'react';
import {Paper, Table, TableHead, TableRow, TableBody, TableCell} from "@material-ui/core";
import {Student} from "../student-model";
import { DeleteOutline, Edit } from '@material-ui/icons';
import {IContainerProps} from "../../ProfessorForm/types";

const styles = require('./Student.pcss');

const StudentTable: React.SFC<Student[]> = (students, props: IContainerProps) => {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>E-mail</TableCell>
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
                                <TableCell>
                                    <Edit className={styles.button} onClick={() => props.history.push('/student/' + row.id)}/>
                                    <DeleteOutline className={styles.button} />
                                </TableCell>
                            </TableRow>
                        );
                    })}

                </TableBody>
            </Table>
        </Paper>
    );
};
export default StudentTable;