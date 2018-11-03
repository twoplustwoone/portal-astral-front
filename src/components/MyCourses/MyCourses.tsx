import * as React from 'react';
import {HashMap, Option} from "prelude.ts";
import {
    Button,
    LinearProgress,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core";
import {DateTime, Interval} from 'luxon'
import * as RemoteData from "@devexperts/remote-data-ts";
import {field, string, succeed} from "jsonous";
import Decoder from "jsonous/Decoder";

import {iso, Newtype} from "newtype-ts";
import session from "../../utils/session";


// ---- HELPER TYPES ----


type WebData<T> = RemoteData.RemoteData<string, T>

interface CourseID extends Newtype<{ readonly CourseID: unique symbol }, string> {
}

interface ExamID extends Newtype<{ readonly ExamID: unique symbol }, string> {
}

interface StudentID extends Newtype<{ readonly ExamID: unique symbol }, string> {
}

const isoCourseID = iso<CourseID>();
const isoExamID = iso<ExamID>();
const isoStudentID = iso<StudentID>();


// ---- MODEL TYPES ----


type Course = {
    id: CourseID
    subjectName: string,
    interval: Interval,
    exams: ExamID[],
}

type Student = {
    id: StudentID,
}

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
    examsDict: HashMap<String, Exam>,
    courses: HashMap<String, Course>,

    // -- Modal --
    selectedCourse: Option<CourseID>,
    modalExams: WebData<Exam[]>,
}

// ---- INITIAL MODEL ----


const demo: Model = {
    currentUser: Option.none(),
    currentDate: Option.none(),

    examsDict: HashMap.of(
        ["e1", {id: isoExamID.wrap("e1"), date: DateTime.local(2018, 3, 11), grade: Option.some(8.0)}],
        ["e2", {id: isoExamID.wrap("e2"), date: DateTime.local(2018, 3, 12), grade: Option.some(4.0)}],
        ["e3", {id: isoExamID.wrap("e3"), date: DateTime.local(2018, 3, 13), grade: Option.some(7.0)}],
    ),

    courses: HashMap.of(
        ["c1", {
            id: isoCourseID.wrap('c1'),
            subjectName: "Alg 1",
            exams: ["e1", "e2", "e3"].map(isoExamID.wrap),
            interval: Interval.fromDateTimes(DateTime.utc(2017, 3, 13), DateTime.utc(2017, 5, 15)),
        }],
        ["c2", {
            id: isoCourseID.wrap('c2'),
            subjectName: "Alg 2",
            exams: ["e1", "e2"].map(isoExamID.wrap),
            interval: Interval.fromDateTimes(DateTime.utc(2018, 3, 13), DateTime.utc(2018, 12, 15)),
        }],
    ),

    modalExams: RemoteData.initial,
    selectedCourse: Option.none(),
}

export class MyCourses extends React.Component<{}, Readonly<Model>> {

    readonly state: Model = demo;

    constructor(props) {
        super(props);

        this.unenroll = this.unenroll.bind(this);
        this.openExamsModal = this.openExamsModal.bind(this);
        this.closeExamsModal = this.closeExamsModal.bind(this);

    }

    componentDidMount() {

        // TODO improve session handling, maybe component should assume a student
        if (session.getUserType() != 'Student')
            throw new Error("Trying to access MyCourses component with a non-student user");

        let userJson = Option.ofNullable(sessionStorage.getItem('user'))
            .match({
                Some: u => u,
                None: () => "",
            });
        // ----------------------------------------------------------------------

        setInterval(
            () => this.updateTime(),
            1000,
        );

        this.setState({
            currentUser: userDecoder.decodeJson(userJson)
                .cata({
                    Err: err => {
                        console.error(err);
                        return Option.none()
                    },
                    Ok: user => Option.some(user),
                }),
        });
    }

    updateTime() {
        this.setState(
            (prevState: Model) => ({
                ...prevState,
                currentDate: Option.some(DateTime.local()),
            }),
        )
    }


    openExamsModal(courseId: CourseID) {
        this.setState(
            (prevState: Model): Model => ({
                ...prevState,
                selectedCourse: Option.of(courseId),
                modalExams: RemoteData.success(
                    this.state.courses
                        .get(isoCourseID.unwrap(courseId))
                        .flatMap(c => Option.sequence(c.exams.map(eid => this.state.examsDict.get(isoExamID.unwrap(eid)))))
                        .match({
                            Some: es => es.toArray(),
                            None: () => [],
                        }),
                ),
            }),
        )
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

    unenroll(studentId: StudentID, courseId: CourseID) {

    }

    render(): React.ReactNode {

        let model = this.state;

        return Option.liftA2(
            (user: Student, currDate: DateTime): React.ReactNode => {
                let coursesInProgress = model.courses
                    .filterValues(c => c.interval.contains(currDate))
                    .toArray()
                    .map(kv => kv[1]);

                let finishedCourses = model.courses
                    .filterValues(c => c.interval.isBefore(currDate))
                    .toArray()
                    .map(kv => kv[1]);


                return (
                    <div>
                        <h1>Courses in progress</h1>
                        {coursesTable(courseInProgressRow(this.openExamsModal)(this.unenroll))(coursesInProgress)}

                        <h1>Finished courses</h1>
                        {coursesTable(courseFinishedRow(this.openExamsModal))(finishedCourses)}


                        <Modal
                            open={model.selectedCourse.isSome()}
                            onClose={this.closeExamsModal}
                        >
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
                                    (err) => <p>Error!</p>,
                                    (exams) => examTable(exams),
                                )}
                            </Paper>
                        </Modal>
                    </div>
                )
            })(model.currentUser, model.currentDate)
            .match({
                Some: render => render,
                None: () => <LinearProgress/>,
            })


    }
}

const coursesTable = (rowFn: (course: Course) => React.ReactNode) => (courses: Course[]): React.ReactNode =>
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
    (onExamsClick: (courseId: CourseID) => any) => (onUnenrollClick: (studentId: StudentID, courseId: CourseID) => any) => (course: Course) => {
        return (
            courseRow
            (
                // TODO user id
                <div>
                    <Button onClick={() => onUnenrollClick(isoStudentID.wrap(""), course.id)} variant="contained"
                            color="primary"
                            style={{marginRight: '5px'}}>
                        Unenroll
                    </Button>
                    <Button onClick={() => onExamsClick(course.id)} variant="contained" color="primary">
                        Exams
                    </Button>
                </div>,
            )
            (course)
        )
    };

const courseFinishedRow = (onExamsClick: (courseId: CourseID) => any) => (course: Course) => {
    return (
        courseRow
        (
            <div>
                <Button onClick={() => onExamsClick(course.id)} variant="contained" color="primary">
                    Exams
                </Button>
            </div>,
        )
        (course)
    );
};

const examTable = (exams: Exam[]): React.ReactNode => {
    return (
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


// function map2<A, B, C>(decA: Decoder<A>, decB: Decoder<B>, fn: ((a: A, b: B) => C)): Decoder<C> {
//     return new Decoder(value => {
//         return decA.decodeAny(value)
//             .andThen(a => decB.decodeAny(value)
//                 .andThen(b => ok(fn(a, b))),
//             )
//     });
// }
//
// function option<A>(decoder: Decoder<A>): Decoder<Option<A>> {
//     return new Decoder(value => {
//         return decoder.decodeAny(value).cata({
//             Err: e => ok(Option.none()),
//             Ok: v => ok(Option.some(v)),
//         });
//     });
// }

// const stringToDateTime = (str: string) => DateTime.fromFormat(str, 'd/M/yyyy');
//
// const courseDecoder: Decoder<Course> =
//     succeed({})
//         .assign('id', field('id', string).map(isoCourseID.wrap))
//         .assign('subjectName', at(["subject"], field("subjectName", string)))
//         .assign('interval',
//             map2(
//                 field('startDate', string).map(stringToDateTime),
//                 field('endDate', string).map(stringToDateTime),
//                 Interval.fromDateTimes,
//             ),
//         )
//         .assign('exams', succeed([]));
//
// const examDecoder: Decoder<Exam> =
//     succeed({})
//         .assign('id', at(['exam'], field('id', string).map(isoExamID.wrap)))
//         .assign('date', at(['exam'], field('date', string.map(stringToDateTime))))
//         .assign('grade', field('grade', option(number)));

const userDecoder: Decoder<Student> =
    succeed({})
        .assign('id', field('id', string).map(isoStudentID.wrap));