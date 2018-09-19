import * as React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import { IState } from "../../../reducers/studentReducer";
import { IProps } from "../types";
import AddIcon from "../../../../node_modules/@material-ui/icons/Add";

const styles = require('./StudentTable.pcss');

class StudentTable extends React.Component<IProps, IState> {

  componentDidMount() {
    this.props.onFetchStudents();
  }

  render() {
    console.log(this.props);
    const { students = [] } = this.props;

    return (
      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              onClick={() => this.props.history.push('/new-student')}
              mini
            >
              <AddIcon />
            </Button>
          </div>
        </div>
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
                students.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <Edit className={styles.button}
                              onClick={() => this.props.history.push('/student/' + row.id)} />
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

export default StudentTable;