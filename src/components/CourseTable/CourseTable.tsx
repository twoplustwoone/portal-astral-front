import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import { deleteCourse, getAllCourses } from "../../utils/api";
import { Link } from "react-router-dom";
import session from "../../utils/session";
import { Redirect } from "react-router";

// const styles = require('./CourseTable.pcss');

class CourseTable extends React.Component<IProps, IState> {

  state: IState = {
    courseBeingDeleted: null,
    courses: [],
    isDeleting: false,
  };

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses = () => {
    getAllCourses().then(this.handleResponse).then(this.receiveCourses);
  };

  handleResponse = (response: Response) => {
    return response.json();
  };

  handleDeleteClick = (id: string) => {
    const courses = this.state.courses;

    const courseBeingDeleted = courses.find(course => course.id === id);
    if (!courseBeingDeleted) {
      return;
    }

    this.setState({ courseBeingDeleted });
  };

  handleCloseDelete = () => {
    this.setState({ isDeleting: false, courseBeingDeleted: null });
  };

  handleConfirmDelete = () => {
    const { courseBeingDeleted } = this.state;

    if (!courseBeingDeleted) {
      return;
    }

    this.setState({ isDeleting: true });
    deleteCourse(courseBeingDeleted.id).then(() => {
      this.handleCloseDelete();
      this.fetchCourses();
    });
  };

  receiveCourses = (courses: ICourse[]) => {
    this.setState({ courses: courses })
  };

  render() {
    const { courseBeingDeleted, isDeleting, courses } = this.state;

    const name = courseBeingDeleted ? `${courseBeingDeleted.subject.subjectName}` : '';

    const userType = session.getUserType();

    if (userType === 'Student') {
      return <Redirect to={'/'} />;
    }

    return (
      <div>
        {
          courseBeingDeleted &&
          <DeleteConfirmationDialog
            userType={'admin'}
            name={name}
            handleCloseDelete={this.handleCloseDelete}
            handleConfirmDelete={this.handleConfirmDelete}
            isLoading={isDeleting}
          />
        }
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link to={'/new-course'}>
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
                  <TableCell>Subject</TableCell>
                  <TableCell>Starts</TableCell>
                  <TableCell>Ends</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>

                {
                  courses.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>{row.subject.subjectName}</TableCell>
                        <TableCell>{row.startDate}</TableCell>
                        <TableCell>{row.endDate}</TableCell>
                        {
                          userType === 'Admin' &&
                          <TableCell>
                            <Link to={`/course/${row.id}`}>
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

export default CourseTable;
