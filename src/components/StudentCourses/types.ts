import * as RemoteData from "@devexperts/remote-data-ts";
import {iso, Newtype} from "newtype-ts";
import {DateTime, Interval} from "luxon";
import Decoder, {at, field, string, succeed} from "jsonous/Decoder";
import {map2} from "../../utils/decoderRequests";


// ---- ----


export type WebData<T> = RemoteData.RemoteData<string, T>


// ---- ----


export interface CourseID extends Newtype<{ readonly CourseID: unique symbol }, string> {
}

export interface ExamID extends Newtype<{ readonly ExamID: unique symbol }, string> {
}

export interface StudentID extends Newtype<{ readonly ExamID: unique symbol }, string> {
}

export const isoCourseID = iso<CourseID>();
export const isoExamID = iso<ExamID>();
export const isoStudentID = iso<StudentID>();


// ---- COURSE ----

export const stringToDateTime = (str: string) => DateTime.fromFormat(str, 'yyyy-MM-dd');

export type Course = {
    id: CourseID
    subjectName: string,
    interval: Interval,
}

export const courseDecoder: Decoder<Course> =
    succeed({})
        .assign('id', field('id', string).map(isoCourseID.wrap))
        .assign('subjectName', at(["subject"], field("subjectName", string)))
        .assign('interval',
            map2(
                field('startDate', string).map(stringToDateTime),
                field('endDate', string).map(stringToDateTime),
                Interval.fromDateTimes,
            ),
        )
        .assign('exams', succeed([]));


// ---- STUDENT ----


export type Student = {
    id: StudentID,
}

export const userDecoder: Decoder<Student> =
    succeed({})
        .assign('id', field('id', string).map(isoStudentID.wrap));