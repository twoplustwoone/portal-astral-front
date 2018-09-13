import * as React from "react";
import StudentTable from "./all-students/Students";
import {Student} from "./student-model";
import {WebData} from "../../../globals";
import {success} from "@devexperts/remote-data-ts";

const dummyStudent: Student = {
    id: "id",
    firstName: "first name",
    lastName: "last name",
    email: "user@provider.com",
};

export interface StudentsState {
    readonly students: WebData<Student[]>
}

const model: StudentsState = {
    students: success([dummyStudent, dummyStudent, dummyStudent]),
};

class StudentListPage extends React.Component {
    public render() {
        return (
            <div>
                <div>
                    {
                        model.students.foldL(
                        () => <p>Pending request</p>,
                        () => <p>Loading</p>,
                        err => <p>Error!</p>,
                        students => StudentTable(students),
                    )}
                </div>
            </div>
    )
    }
}

export default StudentListPage;