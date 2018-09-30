import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { ISubject } from "../../../globals";
import {UserType} from "../layout/sidebar/Sidebar";
import LoginActions from "../../actions/loginActions";

// const styles = require('./SubjectTable.pcss');

class SubjectTable extends React.Component<IProps, IState> {

  state: IState = {
    subjectBeingDeleted: undefined,
  };

  userType: UserType;

  componentDidMount() {
    this.props.onFetchSubjects();
    this.getUserType();
  }

  handleDeleteClick = (id: string) => {
    const subjects = this.props.subjects;

    this.props.onClickDeleteSubject(id);
    this.setState({
      subjectBeingDeleted: subjects.find(subject => subject.id === id),
    })
  };

  getUserType(){
      this.userType = LoginActions.loggedUser.userType;
  }

  handleCloseDelete = () => {
    this.props.onCloseDelete();
  };

  handleConfirmDelete = () => {
    this.props.onConfirmDelete(this.state.subjectBeingDeleted as ISubject);
  };

  render() {
    const { subjects = [], isDeleteConfirmationOpen, isDeletingSubject } = this.props;
    const { subjectBeingDeleted } = this.state;

    const name = subjectBeingDeleted ? `${subjectBeingDeleted.name} ${subjectBeingDeleted.careerYear}` : '';

    return (
      <div>
        {
          isDeleteConfirmationOpen &&
          <DeleteConfirmationDialog
            userType={'subject'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeletingSubject}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={() => this.props.history.push('/new-subject')}
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
                  <TableCell>Name</TableCell>
                  <TableCell>Career Year</TableCell>
                    {this.userType === UserType.ADMINISTRATOR ? <TableCell /> : undefined}
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  subjects.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.careerYear}</TableCell>
                          {this.userType === UserType.ADMINISTRATOR ? <TableCell >
                          <IconButton onClick={() => this.props.history.push('/subject/' + row.id)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => this.handleDeleteClick(row.id)}>
                            <DeleteOutline />
                          </IconButton>
                        </TableCell> : undefined }
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

export default SubjectTable;
