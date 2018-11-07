import {Option} from "prelude.ts";
import {Course, Student, WebData} from "./types";
import {Vector} from "prelude.ts";
import * as React from "react";
import * as RemoteData from "@devexperts/remote-data-ts";


// ---- MODEL ----


type Model = {

    // -- Context --
    currentUser: Option<Student>

    // -- Main table --
    courses: WebData<Vector<Course>>,

    // -- Modal --
    selectedCourse: Option<Course>,

    // -- Snackbar --
    snackbarData: Option<{ message: string, course: Course }>,
}

const initial : Model = {
    currentUser: Option.none(),
    courses: RemoteData.initial,
    selectedCourse : Option.none(),
    snackbarData: Option.none(),
}

// ---- RENDER ----

export class MyCourses extends React.Component<{}, Readonly<Model>> {

    readonly state: Model = initial;


    render() {
        return <div></div>
    }
}

