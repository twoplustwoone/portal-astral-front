import * as React from 'react';
import {Future, Option, Vector} from "prelude.ts";
import {
    Button,
    IconButton,
    LinearProgress,
    Modal,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {DateTime} from 'luxon'
import * as RemoteData from "@devexperts/remote-data-ts";
import {at, field, string, succeed, number} from "jsonous";
import Decoder from "jsonous/Decoder";
import session from "../../utils/session";
import {baseUrl} from "../../utils/api";
import {Close} from "@material-ui/icons";
import {
    httpGetAndDecode,
    option,
    vector,
} from "../../utils/decoderRequests";
import {
    Course,
    CourseID,
    ExamID,
    isoCourseID,
    isoExamID,
    isoStudentID, stringToDateTime,
    Student,
    StudentID, userDecoder,
    WebData,
} from "./types";
import {requestEnroll, requestStudentCourses, requestUnenroll} from "./requests";
import {interval, Subscription} from "rxjs";

// ---- MODEL TYPES ----

type Exam = {
    id: ExamID
    date: DateTime,
    grade: Option<number>,
}

type Model = {

    // -- Context --
    currentUser: Option<Student>
    currentDate: Option<DateTime>

    // -- Main table --
    courses: WebData<Vector<Course>>,

    // -- Modal --
    selectedCourse: Option<Course>,
    modalExams: WebData<Vector<Exam>>,

    // -- Snackbar --
    snackbarData: Option<{ message: string, course: Course, action: "enroll" | "unenroll" }>,
}

// ---- INITIAL MODEL ----

const initial: Model = {
    currentUser: Option.none(),
    currentDate: Option.none(),

    courses: RemoteData.initial,

    selectedCourse: Option.none(),
    modalExams: RemoteData.initial,

    snackbarData: Option.none(),
}

// const demo: Model = {
//     currentUser: Option.none(),
//     currentDate: Option.none(),
//
//     courses: RemoteData.success(
//         Vector.of(
//             {
//                 id: isoCourseID.wrap('c1'),
//                 subjectName: "Alg 1",
//                 exams: ["e1", "e2", "e3"].map(isoExamID.wrap),
//                 interval: Interval.fromDateTimes(DateTime.utc(2017, 3, 13), DateTime.utc(2017, 5, 15)),
//             },
//             {
//                 id: isoCourseID.wrap('c2'),
//                 subjectName: "Alg 2",
//                 exams: ["e1", "e2"].map(isoExamID.wrap),
//                 interval: Interval.fromDateTimes(DateTime.utc(2018, 3, 13), DateTime.utc(2018, 12, 15)),
//             },
//         ),
//     ),
//
//     selectedCourse: Option.none(),
//
//     modalExams: RemoteData.success(
//         Vector.of(
//             {id: isoExamID.wrap("e1"), date: DateTime.local(2018, 3, 11), grade: Option.some(8.0)},
//             {id: isoExamID.wrap("e2"), date: DateTime.local(2018, 3, 12), grade: Option.some(4.0)},
//             {id: isoExamID.wrap("e3"), date: DateTime.local(2018, 3, 13), grade: Option.some(7.0)},
//         ),
//     ),
//
//     snackbarData: Option.none(),
// };


// ---- COMPONENT ----

export class MyCourses extends React.Component<{}, Readonly<Model>> {

    readonly state: Model & { sub: Subscription } = {...initial, sub: interval(1000).subscribe(_ => this.updateTime())};

    constructor(props) {
        super(props);

        this.unenroll = this.unenroll.bind(this);
        this.reenroll = this.reenroll.bind(this);
        this.hideSnackbar = this.hideSnackbar.bind(this);
        this.openExamsModal = this.openExamsModal.bind(this);
        this.closeExamsModal = this.closeExamsModal.bind(this);
    }

    componentDidMount() {

        // TODO improve session handling,
        // maybe component should assume a student since page should be unavailable oltherwise anyway


        if (session.getUserType() != 'Student')
            throw new Error("Trying to access StudentCourses component with a non-student user");

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

        userOption.ifSome(user =>
            requestStudentCourses(user.id)
                .onComplete(res => {
                    let examsWebData: WebData<Vector<Course>> = res.match({
                        Left: l => RemoteData.failure(l.toString()) as WebData<Vector<Course>>,
                        Right: v => RemoteData.success(v),
                    });

                    this.setState({courses: examsWebData})
                }),
        )
        // ----------------------------------------------------------------------


    }

    componentWillUnmount(): void {
        this.state.sub.unsubscribe()
    }

    updateTime() {
        this.setState(
            (prevState: Model) => ({
                ...prevState,
                currentDate: Option.some(DateTime.local()),
            }),
        )
    }


    openExamsModal(course: Course, studentId: StudentID) {
        this.setState({
            selectedCourse: Option.of(course),
            modalExams: RemoteData.pending,
        })


        requestCourseStudentExams(course.id)(studentId)
            .onComplete(res => {
                let examsWebData: WebData<Vector<Exam>> = res.match({
                    Left: l => RemoteData.failure(l.toString()) as WebData<Vector<Exam>>,
                    Right: v => RemoteData.success(v),
                });

                this.setState({modalExams: examsWebData})
            })

        // interval(3000).pipe(
        //     take(1),
        // ).subscribe(_ => this.setState({modalExams: demo.modalExams}))
    }

    closeExamsModal() {
        this.setState(
            (prevState: Model): Model => ({
                ...prevState,
                selectedCourse: Option.none(),
                modalExams: RemoteData.initial,
            }),
        )
    }

    reenroll(course: Course, studentId: StudentID) {
        return () => requestEnroll(course.id)(studentId).onComplete(_ => {
            this.setState({
                courses: this.state.courses.map(cs => cs.append(course)),
                snackbarData: Option.some({
                    message: `Reenrolled to ${course.subjectName}`,
                    course: course,
                    action: "enroll" as "enroll",
                }),
            })
        })
    }

    unenroll(course: Course, studentId: StudentID) {
        requestUnenroll(course.id)(studentId).onComplete(_ => {
            this.setState({
                courses: this.state.courses.map(cs => cs.filter(c => c.id != course.id)),
                snackbarData: Option.some({
                    message: `Unenrolled from ${course.subjectName}`,
                    course: course,
                    action: "unenroll" as "unenroll",
                }),
            })
        })
    }

    hideSnackbar() {
        this.setState({
            snackbarData: Option.none(),
        })
    }

    render(): React.ReactNode {

        let model = this.state;

        return model.courses.foldL(
            () => <LinearProgress/>,
            () => <LinearProgress/>,
            failure => <div>Error loading courses!</div>,
            courses => Option.liftA2(
                (user: Student, currDate: DateTime): React.ReactNode => {

                    let coursesInProgress = courses.filter(c => c.interval.contains(currDate))
                    let finishedCourses = courses.filter(c => c.interval.isBefore(currDate))

                    // coursesInProgress = finishedCourses; // TODO [remove] all initial server courses are already expired
                    return (
                        <div>

                            <h1>Courses in progress</h1>
                            {coursesTable(courseInProgressRow(this.openExamsModal)(this.unenroll)(user.id))(coursesInProgress)}

                            <h1>Finished courses</h1>
                            {coursesTable(courseFinishedRow(this.openExamsModal)(user.id))(finishedCourses)}


                            <Modal
                                open={model.selectedCourse.isSome()}
                                onClose={this.closeExamsModal}
                            >
                                {/* spread operator can be used to make mixins */}
                                <Paper style={
                                    {
                                        ...translateCenter,
                                        position: "absolute",
                                        minWidth: "50%",
                                        maxWidth: "70%",
                                        padding: "20px",
                                    }
                                }>
                                    {model.modalExams.foldL(
                                        () => <LinearProgress/>,
                                        () => <LinearProgress/>,
                                        (failure) => <p>{failure}</p>,
                                        (exams) => examTable(exams),
                                    )}
                                </Paper>
                            </Modal>

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
                                    action={
                                        (data.action == "enroll" as "enroll" ?
                                            [] :
                                            [
                                                // TODO handle session data better
                                                <Button key="undo" color="secondary" size="small"
                                                        onClick={this.reenroll(data.course, model.currentUser.getOrThrow().id)}>
                                                    UNDO
                                                </Button>,
                                            ]).concat(
                                            <IconButton
                                                key="close"
                                                aria-label="Close"
                                                color="inherit"
                                                onClick={this.hideSnackbar}
                                            >
                                                <Close/>
                                            </IconButton>,
                                        )
                                    }
                                />,
                            })}

                        </div>
                    )
                })(model.currentUser, model.currentDate)
                .match({
                    Some: render => render,
                    None: () => <LinearProgress/>,
                }),
        )
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

const courseRow = (actions: React.ReactNode) => (course: Course): React.ReactNode => {
    return (
        <TableRow key={isoCourseID.unwrap(course.id)}>
            <TableCell>{course.subjectName}</TableCell>
            <TableCell>{course.interval.start.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
            <TableCell>{course.interval.end.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
            <TableCell>{actions}</TableCell>
        </TableRow>
    );
};

const courseInProgressRow =
    (onExamsClick: (course: Course, studentId: StudentID) => any) => (onUnenrollClick: (course: Course, studentID: StudentID) => any) => (studentId: StudentID) => (course: Course) => {
        return (
            courseRow
            (
                // TODO user id
                <div>
                    <Button onClick={() => onUnenrollClick(course, studentId)} variant="contained"
                            color="primary"
                            style={{marginRight: '5px'}}>
                        Unenroll
                    </Button>
                    <Button onClick={() => onExamsClick(course, studentId)} variant="contained" color="primary">
                        Exams
                    </Button>
                </div>,
            )
            (course)
        )
    };

const courseFinishedRow = (onExamsClick: (course: Course, studentId: StudentID) => any) => (studentId: StudentID) => (course: Course) => {
    return (
        courseRow
        (
            <div>
                <Button onClick={() => onExamsClick(course, studentId)} variant="contained" color="primary">
                    Exams
                </Button>
            </div>,
        )
        (course)
    );
};

const examTable = (exams: Vector<Exam>): React.ReactNode => {
    return (
        exams.isEmpty() ?
            <p>No exams on this course!</p> :
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams.map(e => {
                            return (
                                <TableRow key={isoExamID.unwrap(e.id)}>
                                    <TableCell>{e.date.setLocale('es-AR').toLocaleString(DateTime.DATE_SHORT)}</TableCell>
                                    <TableCell>
                                        {e.grade.match({
                                            Some: (g => g.toFixed(2)),
                                            None: () => "No grade",
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
    )
};

const translateCenter = {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
};


// ---- REQUESTS ----


export const requestCourseStudentExams = (courseId: CourseID) => (studentId: StudentID): Future<Vector<Exam>> =>
    httpGetAndDecode(
        `${baseUrl}/getExamInscriptionByCourse/${isoCourseID.unwrap(courseId)}`,
        vector(examDecoder).map(v => v.filter(e => e.studentId == studentId)),
    )


// ---- DECODERS ----


// TODO Remove FullExam shenanigans when server adds a way to filter exams by student AND course
type FullExam = Exam & { studentId: StudentID }

const examDecoder: Decoder<FullExam> =
    succeed({})
        .assign('id', at(['exam'], field('id', string).map(isoExamID.wrap)))
        .assign('date', at(['exam'], field('date', string.map(stringToDateTime))))
        .assign('grade', field('result', option(number)))
        .assign('studentId', at(['student'], field('id', string).map(isoStudentID.wrap)));