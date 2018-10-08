import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deleteAdmin, getAllAdmins } from "../../utils/api";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import session from "../../utils/session";

// const styles = require('./AdminTable.pcss');

class AdminTable extends React.Component<IProps, IState> {

  state: IState = {
    adminBeingDeleted: null,
    admins: [],
    isDeleting: false,
  };

  componentDidMount() {
    this.fetchAdmins();
  }

  fetchAdmins = () => {
    getAllAdmins().then(this.handleResponse).then(this.receiveAdmins);
  };

  handleResponse = (response: Response): Promise<IAdmin[]> => {
    if (response.status !== 200) {
      throw Error('Error fetching admins');
    }

    return response.json();
  };

  handleDeleteClick = (id: string) => {
    const admins = this.state.admins;

    const adminBeingDeleted = admins.find(admin => admin.id === id);
    if (!adminBeingDeleted) {
      return;
    }

    this.setState({ adminBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, adminBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { adminBeingDeleted } = this.state;

    if (!adminBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteAdmin(adminBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchAdmins();
    });
  };

  receiveAdmins = (admins: IAdmin[]) => {
    this.setState({ admins })
  };

  render() {
    const { adminBeingDeleted, isDeleting, admins } = this.state;

    const name = adminBeingDeleted ? `${adminBeingDeleted.name} ${adminBeingDeleted.lastName}` : '';

    const userType = session.getUserType();

    if (userType !== 'Admin') {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        {
          adminBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'admin'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link to={'/new-admin'}>
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
                  admins.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <Link to={`/admin/${row.id}`}>
                            <IconButton>
                              <Edit />
                            </IconButton>
                          </Link>
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

export default AdminTable;
