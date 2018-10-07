import {ISubject} from "../../../globals";

class SubjectCourseExample implements ISubject{
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export default SubjectCourseExample;