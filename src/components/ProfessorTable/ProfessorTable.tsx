import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";

// const styles = require('./ProfessorTable.pcss');

class ProfessorTable extends React.Component<IProps, IState> {

  state: IState = {
    professorBeingDeleted: undefined,
  };

  componentDidMount() {
    this.props.onFetchProfessors();
  }

  handleDeleteClick = (id: string) => {
    const professors = this.props.professors;

    this.props.onClickDeleteProfessor(id);
    this.setState({
      professorBeingDeleted: professors.find(professor => professor.id === id),
    })
  };

  handleCloseDelete = () => {
    this.props.onCloseDelete();
  };

  handleConfirmDelete = () => {
    this.props.onConfirmDelete(this.state.professorBeingDeleted as IProfessor);
  };

  render() {
    const { professors = [], isDeleteConfirmationOpen, isDeletingProfessor } = this.props;
    const { professorBeingDeleted } = this.state;

    const name = professorBeingDeleted ? `${professorBeingDeleted.name} ${professorBeingDeleted.lastName}` : '';

    return (
      <div>
        {
          isDeleteConfirmationOpen &&
          <DeleteConfirmationDialog
            userType={'professor'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeletingProfessor}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={() => this.props.history.push('/new-professor')}
            mini
          >
            <AddIcon />
          </Button>
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
                        <TableCell>
                          <IconButton onClick={() => this.props.history.push('/professor/' + row.id)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => this.handleDeleteClick(row.id)}>
                            <DeleteOutline />
                          </IconButton>
                        </TableCell>
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
