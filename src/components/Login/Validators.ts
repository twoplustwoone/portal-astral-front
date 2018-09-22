class Validators {


    validate = (field: string, value: any): boolean => {
        switch (field) {
            case 'name':
                return (
                    this.validateName(value)
                );
            case 'lastName':
                return (
                    this.validateLastName(value)
                );
            case 'email':
                return (
                    this.validateEmail(value)
                );
            case 'password':
                return (
                    this.validatePassword(value)
                );
            default:
                return true;
        }
    };

    validateName = (value: any): boolean => {
        return value !== '';
    };

    validateLastName = (value: any): boolean => {
        return value !== '';
    };

    validateEmail = (value: any): boolean => {
        return value !== '' && value.includes('@');
    };

    validatePassword = (value: any): boolean => {
        return !!(value != "" && value.length >= 6 && value.length < 20 && this.checkLetters(value));
    };

    checkBooleans = (acc: boolean, elem: boolean) => {
        return acc && elem
    };

    checkLetters = (value: string): boolean => {
        const words = value.match("[A-z]+");
        const numbers = value.match("[0-9]+");
        return words != undefined && words.length > 0 && numbers != undefined && numbers.length > 0;
    };

}