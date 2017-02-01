import { AuthorizationStatus } from '../models/authorizationStatus'
export class User {
    firstName: string
    lastname: string
    username: string
    password: string
    emailAddress: string
    authStatus: AuthorizationStatus
    constructor(
        firstName: string = '',
        lastName: string = '',
        username: string = '',
        password: string = '',
        emailAddress: string = '',
        authStatus: AuthorizationStatus = AuthorizationStatus.Unknown
    ) {
        this.firstName = firstName
        this.lastname = lastName
        this.username = username
        this.password = password
        this.emailAddress = emailAddress
        this.authStatus = authStatus
    }
}