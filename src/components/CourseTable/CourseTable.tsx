import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from "@material-ui/core";
import {ControlPoint, DeleteOutline, Edit} from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import {deleteCourse, enrollStudentInCourse, getAllCourses} from "../../utils/api";
import {Link, Redirect} from "react-router-dom";
import session from "../../utils/session";

// const styles = require('./CourseTable.pcss');

class CourseTable extends React.Component<IProps, IState> {

    state: IState = {
        courseBeingDeleted: null,
        courses: [],
        isDeleting: false,
        redirect: '',
        enrolledCourses: [],
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

    handleEnrollment = (id: string) => {
        enrollStudentInCourse(id, (session.getUser() as IStudent).id).then(() =>{
            this.state.enrolledCourses.push(id);
            this.setState({
                enrolledCourses: this.state.enrolledCourses,
            });
            console.log("enrolled");
        });
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

    redirect = () => {
        this.setState({ redirect: '/courses' });
    };

    receiveCourses = (courses: ICourse[]) => {
        this.setState({
            courses: courses,
            //todo enrolledCourses: courses.filter(course => course)
        })
    };

    private filteredCourses: any;

    render() {
        const { courseBeingDeleted, isDeleting, courses, redirect, enrolledCourses} = this.state;

        const name = courseBeingDeleted ? `${courseBeingDeleted.subject.subjectName}` : '';

        const userType = session.getUserType();

        let isStudent = false;

        const today = new Date();

        if (userType === 'Student'){
            isStudent = true;
        }

        if (redirect) {
            return <Redirect to={redirect} />;
        }

        function filter(course: ICourse) {
            if(course.startDate > today.toISOString().substr(0,10) && course.endDate > today.toISOString().substr(0,10)) {
                return enrolledCourses.filter(enrolled => enrolled == course.id).length <= 0;

            } else {
                return false;
            }
        }

        isStudent? this.filteredCourses = courses.filter(filter): false;

        console.log(this.filteredCourses);
        console.log(enrolledCourses);

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
                {
                    !isStudent &&
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
                }
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
                                    isStudent?
                                    this.filteredCourses.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.subject.subjectName}</TableCell>
                                                <TableCell>{row.startDate}</TableCell>
                                                <TableCell>{row.endDate}</TableCell>
                                                {
                                                    <TableCell>
                                                        <IconButton onClick={() => this.handleEnrollment(row.id)}>
                                                            <ControlPoint />
                                                        </IconButton>
                                                    </TableCell>
                                                }
                                            </TableRow>
                                        );
                                    })
                                    :
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
