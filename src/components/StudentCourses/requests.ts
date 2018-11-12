import {Course, courseDecoder, CourseID, isoCourseID, isoStudentID, StudentID} from "./types";
import {Future, Vector} from "prelude.ts";
import {httpDeleteAndDecode, httpGetAndDecode, httpPostAndDecode, vector} from "../../utils/decoderRequests";
import {baseUrl} from "../../utils/api";
import {succeed} from "jsonous";

export const requestStudentCourses = (studentId: StudentID): Future<Vector<Course>> =>
    httpGetAndDecode(
        `${baseUrl}/student/${isoStudentID.unwrap(studentId)}/courses`,
        vector(courseDecoder),
    )

export const requestEnroll = (courseId: CourseID) => (studentId: StudentID): Future<any> =>
    httpPostAndDecode(
        `${baseUrl}/course/${isoCourseID.unwrap(courseId)}/enroll`,
        [isoStudentID.unwrap(studentId)],
        succeed({}),
    )

export const requestUnenroll = (courseId: CourseID) => (studentId: StudentID): Future<any> =>
    httpDeleteAndDecode(
        `${baseUrl}/course/${isoCourseID.unwrap(courseId)}/remove`,
        [isoStudentID.unwrap(studentId)],
        succeed({}),
    )



export const requestAllCourses = (): Future<Vector<Course>> =>
    httpGetAndDecode(
        `${baseUrl}/course`,
        vector(courseDecoder),
    )