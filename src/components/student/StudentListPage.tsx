import * as React from "react";
import StudentTable from "./all-students/Students";
import {Student} from "./student-model";
import {WebData} from "../../../globals";
import {success} from "@devexperts/remote-data-ts";
import {IProps, IState} from "../ProfessorForm/types";

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

class StudentListPage extends React.Component<IProps, IState> {
    public render() {
        return (
            <div>
                <div>
                    {
                        model.students.foldL(
                        () => <p>Loading</p>,
                        () => <p>Loading</p>,
                        err => <p>Error!</p>,
                        students => StudentTable(students, this.props),
                    )}
                </div>
            </div>
    )}
}

export default StudentListPage;