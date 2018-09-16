import * as React from "react";
import StudentTable from "./all-students/Students";
import {Student} from "./student-model";
import {WebData} from "../../../globals";
import {success} from "@devexperts/remote-data-ts";
import {IProps, IState} from "../ProfessorForm/types";

const students: Student[] = [
    {
        id: "1",
        firstName: "Sebas",
        lastName: "Belaustegui",
        email: "sebas@mail.com",
    },
    {
        id: "2",
        firstName: "Pipa",
        lastName: "Pepe",
        email: "pipa@gmail.com",
    },
    {
        id: "3",
        firstName: "Jerma",
        lastName: "Mila",
        email: "jerma@mail.com",
    },
];

export interface StudentsState {
    readonly students: WebData<Student[]>
}

const model: StudentsState = {
    students: success(students),
};

class StudentListPage extends React.Component<IProps, IState> {
    public render() {
        return (
            <div>
                <div>
                    {
                        model.students.foldL(
                        () => <p>Cargando</p>,
                        () => <p>Cargando</p>,
                        err => <p>Hubo un error al cargar los estudiantes. Por favor inténtelo nuevamente mas tarde.</p>,
                        students => StudentTable(students, this.props),
                    )}
                </div>
            </div>
    )}
}

export default StudentListPage;