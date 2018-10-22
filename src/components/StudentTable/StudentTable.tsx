import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deleteStudent, getAllStudents } from "../../utils/api";
import { Link } from "react-router-dom";
import session from "../../utils/session";

// const styles = require('./StudentTable.pcss');

class StudentTable extends React.Component<IProps, IState> {

  state: IState = {
    studentBeingDeleted: null,
    students: [],
    isDeleting: false,
  };

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    getAllStudents().then(this.handleResponse).then(this.receiveStudents);
  };

  handleResponse = (response: Response) => {
    return response.json();
  };

  handleDeleteClick = (id: string) => {
    const students = this.state.students;

    const studentBeingDeleted = students.find(student => student.id === id);
    if (!studentBeingDeleted) {
      return;
    }

    this.setState({ studentBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, studentBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { studentBeingDeleted } = this.state;

    if (!studentBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteStudent(studentBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchStudents();
    });
  };

  receiveStudents = (students: IStudent[]) => {
    this.setState({ students })
  };

  render() {
    const { studentBeingDeleted, isDeleting, students } = this.state;

    const name = studentBeingDeleted ? `${studentBeingDeleted.name} ${studentBeingDeleted.lastName}` : '';

    const userType = session.getUserType();

    return (
      <div>
        {
          studentBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'student'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link to={'/new-student'}>
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              mini
            >
              <AddIcon />
            </Button>
          </Link>
        </div>
        <Paper>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>E-mail</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  students.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        {
                          userType === 'Admin' && <TableCell>
                            <Link to={`/student/${row.id}`}>
                              <IconButton>
                                <Edit />
                              </IconButton>
                            </Link>
                            <IconButton onClick={() => this.handleDeleteClick(row.id)}>
                              <DeleteOutline />
                            </IconButton>
                          </TableCell>
                        }
                      </TableRow>
                    );
                  })
                }

              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

export default StudentTable;
