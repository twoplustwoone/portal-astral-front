import * as React from 'react';
import { IProps, IState } from './types';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import {deleteCourse, getAllCourses} from "../../utils/api";
import {Redirect} from "react-router-dom";
import session from "../../utils/session";

// const styles = require('./CourseTable.pcss');

class MyCourseTable extends React.Component<IProps, IState> {

    state: IState = {
        courseBeingDeleted: null,
        courses: [],
        isDeleting: false,
        redirect: '',
        isMyCourses: false,
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

    redirect = () => {
        this.setState({ redirect: '/my-courses' });
    };

    receiveCourses = (courses: ICourse[]) => {
        this.setState({ courses: courses })
    };

    private myCourses: any;

    render() {
        const { courses, redirect} = this.state;

        const userType = session.getUserType();

        var isStudent = false;

        if (userType !== 'Student') {
            return <Redirect to={'/courses'} />;
        } else {
            isStudent = true;
        }

        if (redirect) {
            return <Redirect to={redirect} />;
        }

        var today = new Date();

        function filter(course: ICourse) {
            if(course.startDate < today.toISOString() && course.endDate > today.toISOString() && course.enrolled.length > 0) {
                return course.enrolled.map(student =>
                    student.id == (session.getUser() as IStudent).id)
                    .reduceRight(
                        (accumulator, currentValue) => accumulator || currentValue,
                    );
            } else {
                return false;
            }
        }

        isStudent? this.myCourses = courses.filter(filter) : false;

        return (
            <div>
                <Paper>
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Subject</TableCell>
                                    <TableCell>Starts</TableCell>
                                    <TableCell>Ends</TableCell>
                                    <TableCell>Schedule</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    isStudent &&
                                    this.myCourses.map( row =>{
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.subject.subjectName}</TableCell>
                                                <TableCell>{row.startDate}</TableCell>
                                                <TableCell>{row.endDate}</TableCell>
                                                <TableCell>{row.schedule}</TableCell>
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

export default MyCourseTable;
