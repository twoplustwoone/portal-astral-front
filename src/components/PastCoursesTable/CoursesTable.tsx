import * as React from 'react';
import {IProps, IState} from './types';
import {ICourse} from "../../../globals";
import {DeleteConfirmationDialog} from "../DeleteConfirmationDialog/DeleteConfirmationDialog";
import {DeleteOutline, Edit} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import CoursesExample from "./CoursesExample";
import SubjectCourseExample from "./SubjectCourseExample";

// const styles = require('./PastCoursesTable.pcss');

class CoursesTable extends React.Component<IProps, IState> {

    examples: CoursesExample[] = [
        new CoursesExample("1", [], new Date(1995, 7, 14), new Date(2005, 7, 14), new SubjectCourseExample("AM")),
        new CoursesExample("2", [], new Date(2005, 7, 14), new Date(2010, 7, 14), new SubjectCourseExample("AM")),
        new CoursesExample("3", [], new Date(2005, 7, 14), new Date(2015, 7, 14), new SubjectCourseExample("AM")),
    ];

    state: IState = {
        courseBeingDeleted: undefined,
    };

    componentDidMount() {
        if (!this.props.match.params.id) return;
        this.props.onFetchCourses(this.props.match.params.id);
    }

    handleDeleteClick = (id: string) => {
        const courses = this.props.courses;

        this.props.onClickDeleteCourse(id);
        this.setState({
            courseBeingDeleted: courses.find(c => c.id === id),
        });
    };

    handleCloseDelete = () => {
        this.props.onCloseDelete();
    };

    handleConfirmDelete = () => {
        this.props.onConfirmDelete(this.state.courseBeingDeleted as ICourse);
    };

    render() {
        const {courses = [], isDeleteConfirmationOpen, isDeletingCourse} = this.props;

        const {courseBeingDeleted} = this.state;

        const name = courseBeingDeleted ? `${courseBeingDeleted.id} ${courseBeingDeleted.subject}` : '';

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
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>

                </div>
                <Paper>
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Materia</TableCell>
                                    <TableCell>Fecha de Inicio</TableCell>
                                    <TableCell>Fecha de Finalización</TableCell>
                                    <TableCell>Editar</TableCell>
                                    <TableCell>Remover</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {
                                    courses.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.subject.name}</TableCell>
                                                <TableCell>{row.startUp}</TableCell>
                                                <TableCell>{row.dueDate}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        onClick={() => this.props.history.push('/past-course/' + row.id)}>
                                                        <Edit/>
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => this.handleDeleteClick(row.id)}>
                                                        <DeleteOutline/>
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

export default CoursesTable;
