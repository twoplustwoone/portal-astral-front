import {DateTime} from "luxon";

export const validateBirthdayDate = (currentDate: DateTime) => (dateToValidate: DateTime) : boolean =>
    dateToValidate.isValid
    && dateToValidate.toMillis() < currentDate.toMillis();