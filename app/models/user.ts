export class User {
    firstName: string;
    lastname: string;
    username: string;
    password: string;
    emailAddress: string;
    constructor(
        firstName: string = '',
        lastName: string = '',
        username: string = '',
        password: string = '',
        emailAddress: string = ''
    ) {
        this.firstName = firstName;
        this.lastname = lastName;
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress
    }
}