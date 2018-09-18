import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';

const styles = require('./ProfessorTable.pcss');

class ProfessorTable extends React.Component<IProps, IState> {

  componentDidMount() {
    this.props.onFetchProfessors();
  }

  render() {
    const { professors = [] } = this.props;

    return (
      <div>
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
                          <Edit className={styles.button}
                                onClick={() => this.props.history.push('/professor/' + row.id)} />
                          <DeleteOutline className={styles.button} />
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
