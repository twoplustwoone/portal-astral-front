import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deleteCareer, getAllCareers } from "../../utils/api";
import { Link } from "react-router-dom";

// const styles = require('./CareerTable.pcss');

class CareerTable extends React.Component<IProps, IState> {

  state: IState = {
    careerBeingDeleted: null,
    careers: [],
    isDeleting: false,
  };

  componentDidMount() {
    this.fetchCareers();
  }

  fetchCareers = () => {
    getAllCareers().then(this.handleResponse).then(this.receiveCareers);
  };

  handleResponse = (response: Response): Promise<ICareer[]> => {
    if (response.status !== 200) {
      throw Error('Error fetching careers');
    }

    return response.json();
  };

  handleDeleteClick = (id: string) => {
    const careers = this.state.careers;

    const careerBeingDeleted = careers.find(career => career.id === id);
    if (!careerBeingDeleted) {
      return;
    }

    this.setState({ careerBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, careerBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { careerBeingDeleted } = this.state;

    if (!careerBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteCareer(careerBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchCareers();
    });
  };

  receiveCareers = (careers: ICareer[]) => {
    this.setState({ careers })
  };

  render() {
    const { careerBeingDeleted, isDeleting, careers } = this.state;

    const name = careerBeingDeleted ? `${careerBeingDeleted.careerName}` : '';

    return (
      <div>
        {
          careerBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'career'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link to={'/new-career'}>
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
                  <TableCell>Name</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  careers.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.careerName}</TableCell>
                        <TableCell>
                          <Link to={`/career/${row.id}`}>
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

export default CareerTable;
