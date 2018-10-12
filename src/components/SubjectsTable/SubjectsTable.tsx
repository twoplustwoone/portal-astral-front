import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deleteSubject, getAllSubjects } from "../../utils/api";
import { Link } from "react-router-dom";
import session from "../../utils/session";

// const styles = require('./SubjectTable.pcss');

class SubjectsTable extends React.Component<IProps, IState> {

  state: IState = {
    subjectBeingDeleted: null,
    subjects: [],
    isDeleting: false,
  };

  componentDidMount() {
    this.fetchSubjects();
  }

  fetchSubjects = () => {
    getAllSubjects().then(this.handleResponse).then(this.receiveSubjects);
  };

  handleResponse = (response: Response) => {
    return response.json();
  };

  handleDeleteClick = (id: string) => {
    const subjects = this.state.subjects;

    const subjectBeingDeleted = subjects.find(subject => subject.id === id);
    if (!subjectBeingDeleted) {
      return;
    }

    this.setState({ subjectBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, subjectBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { subjectBeingDeleted } = this.state;

    if (!subjectBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteSubject(subjectBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchSubjects();
    });
  };

  receiveSubjects = (subjects: ISubject[]) => {
    this.setState({ subjects })
  };

  render() {
    const { subjectBeingDeleted, isDeleting, subjects } = this.state;

    const name = subjectBeingDeleted ? subjectBeingDeleted.subjectName : '';

    const userType = session.getUserType();

    return (
      <div>
        {
          subjectBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'subject'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link to={'/new-subject'}>
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
                  <TableCell>Nombre</TableCell>
                  <TableCell>Año</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  subjects.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.subjectName}</TableCell>
                        <TableCell>{row.careerYear}</TableCell>
                        {
                          userType === 'Admin' &&
                          <TableCell>
                            <Link to={`/subject/${row.id}`}>
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

export default SubjectsTable;
