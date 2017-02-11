import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { Form } from '@angular/forms'

import { User } from '../models/user'
import { Auth } from '../auth/service'
import { Messenger } from '../messenger/service'

@Component({
    selector: '<login>',
    templateUrl: 'app/login/template.html',
    styleUrls: ['app/login/style.css']
})
export class Login {
    username:string = ''
    password: string = ''
    constructor(private auth: Auth,
                private location: Location,
                private router: Router,
                private messenger: Messenger) {}

    login() {
        this.auth.login(this.username, this.password)
            .then(user => {
                this.router.navigate(['dashboard'])
            }).catch(error => {
                this.messenger.display(error.message || 'Unknown error occured')
            })
    }

    goBack() {
        this.location.back()
    }
}