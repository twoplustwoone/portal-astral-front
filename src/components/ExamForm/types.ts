import * as H from "history";
import {match} from "react-router";

export interface IProps {
    history: H.History;
    location: H.Location<any>;
    match: match<any>;
};

/* Internal state. Usually left empty except for forms and other small exceptions */
export interface IState {
    fields: IFields;
    errors: IErrors;
    isNew: boolean;
    isEditing: boolean;
    isFetching: boolean;
    isDeleting: boolean;
    isCreating: boolean;
    redirect?: string;
    course?: ICourse;
    isDeleteModalOpen: boolean;
    allCourses: ICourse[],
}

export interface IFields {
    course: ICourse;
    date: string;
    id: string;
    courses: string[];
}

export type IErrors = {
    [p in keyof IFields]?: boolean
};
