import {Future, Option} from "prelude.ts";
import {Course, isoCourseID, Student, StudentID, userDecoder, WebData} from "./types";
import {Vector} from "prelude.ts";
import * as React from "react";
import * as RemoteData from "@devexperts/remote-data-ts";
import {requestAllCourses, requestEnroll, requestStudentCourses} from "./requests";
import {
    Button,
    LinearProgress,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {DateTime} from "luxon";


// ---- MODEL ----


type Model = {

    // -- Context --
    currentUser: Option<Student>

    // -- Main table --
    availableCourses: WebData<Vector<Course>>,

    // -- Snackbar --
    snackbarData: Option<{ message: string, course: Course }>,
}

const initial: Model = {
    currentUser: Option.none(),
    availableCourses: RemoteData.initial,
    snackbarData: Option.none(),
}

// ---- RENDER ----

export class AvailableCourses extends React.Component<{}, Readonly<Model>> {

    readonly state: Model = initial;

    constructor(props) {
        super(props);
        this.enroll = this.enroll.bind(this);
        this.hideSnackbar = this.hideSnackbar.bind(this);

    }

    enroll(course: Course, studentId: StudentID) {
        return () => requestEnroll(course.id)(studentId).onComplete(_ => {
            this.setState({
                availableCourses: this.state.availableCourses.map(cs => cs.filter(c => c.id != course.id)),
                snackbarData: Option.some({
                    message: `Enrolled to ${course.subjectName}`,
                    course: course,
                }),
            })
        })
    }

    hideSnackbar() {
        this.setState({
            snackbarData: Option.none(),
        })
    }


    componentWillMount(): void {
        let userOption: Option<Student> =
            Option.ofNullable(sessionStorage.getItem('user'))
                .flatMap(json => userDecoder.decodeJson(json)
                    .cata({
                        Err: err => {
                            console.error(err);
                            return Option.none()
                        },
                        Ok: user => Option.some(user),
                    }))

        this.setState({
            currentUser: userOption,
        });

        this.setState({availableCourses: RemoteData.pending})

        userOption.ifSome(user =>
            requestAllCourses().flatMap(all => {
                return requestStudentCourses(user.id)
                    .map(cs => cs.map(c => isoCourseID.unwrap(c.id)))
                    .flatMap(studentCoursesIds => {
                        return Future.ok(all
                            // .filter(c => c.interval.isBefore(DateTime.local())) // TODO [uncomment] all initial server courses are already expired
                            .filter(c => !studentCoursesIds.contains(isoCourseID.unwrap(c.id))),
                        )
                    })
            }).onComplete(res => {
                res.match({
                    Left: err => this.setState({availableCourses: RemoteData.failure(err)}),
                    Right: cs => this.setState({availableCourses: RemoteData.success(cs)}),
                })
            }),
        )
    }

    render() {
        let model: Model = this.state;

        return model.currentUser.match({
            None: () => <LinearProgress/>,
            Some: u => model.availableCourses.foldL(
                () => <LinearProgress/>,
                () => <LinearProgress/>,
                err => <div>{`Error loading courses: ${err}`}</div>,
                cs => <div>
                    {coursesTable(courseRow(this.enroll)(u.id))(cs)}

                    {model.snackbarData.match({
                        None: () => {
                        },
                        Some: data => <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={model.snackbarData.isSome()}
                            autoHideDuration={6000}
                            onClose={this.hideSnackbar}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span
                                id="message-id">{data.message}</span>}
                        />,
                    })}
                </div>,
            ),
        })
    }
}

const coursesTable = (rowFn: (course: Course) => React.ReactNode) => (courses: Vector<Course>): React.ReactNode =>
    courses.isEmpty() ?
        <p>No courses!</p> :
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map(rowFn)}
                </TableBody>
            </Table>
        </Paper>

const courseRow = (onEnrollClick: (course: Course, studentID: StudentID) => any) => (studentId: StudentID) => (course: Course): React.ReactNode => {
    return (
        <TableRow key={isoCourseID.unwrap(course.id)}>
            <TableCell>{course.subjectName}</TableCell>
            <TableCell>{course.interval.start.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
            <TableCell>{course.interval.end.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
            <TableCell>
                <div>
                    <Button onClick={onEnrollClick(course, studentId)} variant="contained" color="primary">
                        Enroll
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};

