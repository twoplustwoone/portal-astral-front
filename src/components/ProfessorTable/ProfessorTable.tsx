import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";

const styles = require('./ProfessorTable.pcss');

class ProfessorTable extends React.Component<IProps, IState> {

  componentDidMount() {
    this.props.onFetchProfessors();
  }

  render() {
    console.log(this.props);
    const { professors = [] } = this.props;

    return (
      <div>
        <Paper>
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
        </Paper>
      </div>
    );
  }
}

export default ProfessorTable;
