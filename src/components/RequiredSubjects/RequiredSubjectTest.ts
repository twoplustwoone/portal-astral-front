import {ISubject} from "../../../globals";

class RequiredSubjectTest implements ISubject{
    careerYear: number;
    id: string;
    name: string;
    subjectsRequired: ISubject[];


    constructor(careerYear: number, id: string, name: string, subjectsRequired: ISubject[]) {
        this.careerYear = careerYear;
        this.id = id;
        this.name = name;
        this.subjectsRequired = subjectsRequired;
    }
}

export default RequiredSubjectTest;