import { Injectable } from '@angular/core'
import { Http, Request, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { User } from '../models/user'

@Injectable()
export class Auth {
    private user: User
    constructor(private http: Http) {}

    login(username: string, password: string): Promise<User> {
        //if user has already logged in, return previously logged in
        if (this.user) {
            return new Promise((res, rej) => {
                res(this.user)
            })
        }
        return this.http
            .post('/auth',
                {username: username, 
                password: password})
            .toPromise()
            .then(response => {
                this.user = response.json()
                return this.user
            })
    }

    logout(): Promise<string> {
        this.user = null
        return this.http
            .post('/logout',{})
            .toPromise()
            .then(response => {
                return response.json().message
            })
    }

    checkUser(): Promise<boolean> {
        if (this.user) {
            return new Promise((res, rej) => {
                res(true)
            })
        }
        return this.http
            .get('/auth/user')
            .toPromise()
            .then(response => {
                return response.json().loggedIn
            })
    }
}