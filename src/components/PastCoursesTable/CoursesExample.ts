import {ICourse, IDictationHours, ISubject} from "../../../globals";

class CoursesExample implements ICourse{
    id: string;
    schedule: IDictationHours[];
    startUp: Date;
    dueDate: Date;
    subject: ISubject;


    constructor(id: string, schedule: IDictationHours[], startUp: Date, dueDate: Date, subject: ISubject) {
        this.id = id;
        this.schedule = schedule;
        this.startUp = startUp;
        this.dueDate = dueDate;
        this.subject = subject;
    }
}

export default CoursesExample;