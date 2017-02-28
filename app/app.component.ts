import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { OnInit } from '@angular/core'

import { Location } from '@angular/common'
import { Auth } from './auth/service'
import { Messenger } from './messenger/service'

@Component({
    selector: 'my-app',
    templateUrl: './app/template.html',
    styleUrls: ['./app/style.css']
})
export class AppComponent implements OnInit { 
    menuVis: boolean = false
    logoutVis: boolean = false
    message: string = ''
    messageError: boolean = false
    menuItems = [
        {path: ["list","recipes","0"],
        text: "Recipes"},
        {path: ["list","reviews","0"],
        text: "Reviews"},
        {path: ["login"],
        text: "Login"}]

    constructor(private router: Router,
                private location: Location,
                private auth: Auth, 
                private messenger: Messenger) {}

    ngOnInit(): void {
        this.checkUser()
        this.messenger.addListener((text: string, error: boolean) => {
            this.message = text
            this.messageError = error
        })
    }

    toggleMenu() {
        this.menuVis = !this.menuVis
        this.checkUser()     
    }

    goToItem(path) {
        this.router.navigate(path)
        this.menuVis = false
    }

    checkUser() {
        this.auth
            .checkUser()
            .then(status => {
                if (status === true) {
                    this.resetMenuItem(2, ["entry", "new"], "New Post")
                    this.logoutVis = true
                }
            }).catch(error => {
                console.error(error.message)
            })
    }

    logout() {
        this.auth
            .logout()
            .then(status => {
                this.messenger.display(status)
                this.resetMenuItem(2, ["login"], "Login")
                this.logoutVis = false
                this.router.navigate(['dashboard'])
            }).catch(error => {
                this.messenger.display('Error logging out')
            })
    }

    resetMenuItem(index, path, text) {
        this.menuItems[index] = {path: path,
                                 text: text}
    }
}