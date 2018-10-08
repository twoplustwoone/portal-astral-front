import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deleteProfessor, getAllProfessors } from "../../utils/api";
import { Link } from "react-router-dom";
import session from "../../utils/session";

// const styles = require('./ProfessorTable.pcss');

class ProfessorTable extends React.Component<IProps, IState> {

  state: IState = {
    professorBeingDeleted: null,
    professors: [],
    isDeleting: false,
  };

  componentDidMount() {
    this.fetchProfessors();
  }

  fetchProfessors = () => {
    getAllProfessors().then(this.handleResponse).then(this.receiveProfessors);
  };

  handleResponse = (response: Response) => {
    return response.json();
  };

  handleDeleteClick = (id: string) => {
    const professors = this.state.professors;

    const professorBeingDeleted = professors.find(professor => professor.id === id);
    if (!professorBeingDeleted) {
      return;
    }

    this.setState({ professorBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, professorBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { professorBeingDeleted } = this.state;

    if (!professorBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteProfessor(professorBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchProfessors();
    });
  };

  receiveProfessors = (professors: IProfessor[]) => {
    this.setState({ professors })
  };

  render() {
    const { professorBeingDeleted, isDeleting, professors } = this.state;

    const name = professorBeingDeleted ? `${professorBeingDeleted.name} ${professorBeingDeleted.lastName}` : '';

    const userType = session.getUserType();

    return (
      <div>
        {
          professorBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'professor'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link to={'/new-professor'}>
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
                  professors.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        {
                          userType === 'Admin' &&
                          <TableCell>
                            <Link to={`/professor/${row.id}`}>
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

export default ProfessorTable;
