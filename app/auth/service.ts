import { Injectable } from '@angular/core'
import { Http, Request, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { User } from '../models/user'

@Injectable()
export class Auth {

    constructor(private http: Http) {}

    login(username: string, password: string): Promise<User> {
        return this.http
            .post('/auth', {username: username, password: password})
            .toPromise()
            .then(response => {
                return response.json()
            })
    }

    checkUser(): Promise<User> {
        return this.http
            .get('/auth/user')
            .toPromise()
            .then(response => {
                return response.json()
            })
    }
}