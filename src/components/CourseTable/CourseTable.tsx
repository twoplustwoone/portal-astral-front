import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { ICourse } from "../../../globals";
import {UserType} from "../layout/sidebar/Sidebar";

// const styles = require('./CourseTable.pcss');

class CourseTable extends React.Component<IProps, IState> {

  state: IState = {
    courseBeingDeleted: undefined,
  };

  componentDidMount() {
    this.props.onFetchCourses();
  }

  handleDeleteClick = (id: string) => {
    const courses = this.props.courses;

    this.props.onClickDeleteCourse(id);
    this.setState({
      courseBeingDeleted: courses.find(course => course.id === id),
    })
  };

  handleCloseDelete = () => {
    this.props.onCloseDelete();
  };

  handleConfirmDelete = () => {
    this.props.onConfirmDelete(this.state.courseBeingDeleted as ICourse);
  };

  render() {
    const { courses = [], isDeleteConfirmationOpen, isDeletingCourse, userType } = this.props;
    const { courseBeingDeleted } = this.state;

    const name = courseBeingDeleted ? `${courseBeingDeleted.subject.subjectName}` : '';

    return (
      <div>
        {
          isDeleteConfirmationOpen &&
          <DeleteConfirmationDialog
            userType={'course'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeletingCourse}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={() => this.props.history.push('/new-course')}
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
                  <TableCell>Materia</TableCell>
                  <TableCell>Fecha Inicio</TableCell>
                    {userType === UserType.ADMINISTRATOR ? <TableCell /> : undefined}
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  courses.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.subject.subjectName}</TableCell>
                        <TableCell>{row.startTime}</TableCell>
                          {userType === UserType.ADMINISTRATOR ?
                              <TableCell>
                                  <IconButton onClick={() => this.props.history.push('/course/' + row.id)}>
                                    <Edit />
                                  </IconButton>
                                  <IconButton onClick={() => this.handleDeleteClick(row.id)}>
                                    <DeleteOutline />
                                  </IconButton>
                             </TableCell> : undefined}
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

export default CourseTable;
