import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { OnInit } from '@angular/core'

import { Auth } from './auth/service'
import { Messenger } from './messenger/service'

@Component({
    selector: 'my-app',
    templateUrl: './app/template.html',
    styleUrls: ['./app/style.css']
})
export class AppComponent implements OnInit { 
    menuVis: boolean = false
    message: string = ''
    menuItems = [
        {path: ["list","recipes","0"],
        text: "Recipes"},
        {path: ["list","reviews","0"],
        text: "Reviews"},
        {path: ["login"],
        text: "Login"}]

    constructor(private router: Router
                , private auth: Auth
                , private messenger: Messenger) {}

    ngOnInit(): void {
        this.checkUser()
        this.messenger.addListener((text) => {
            this.message = text
        })
    }

    toggleMenu() {
        this.menuVis = !this.menuVis
        this.checkUser()     
    }

    goToItem(path) {
        console.log(path)
        this.router.navigate(path)
        this.menuVis = false
    }

    checkUser() {
        this.auth
            .checkUser()
            .then(status => {
                if (status === true) {
                    this.menuItems[2] = {path: ["entry"],
                                         text: "New Post"}
                }
            }).catch(error => {
                console.error(error.message)
            })
    }

    logout() {
        this.auth
            .logout()
            .then(status => {
                this.displayMessage(status)
            }).catch(error => {
                this.displayMessage('Error logging out')
            })
    }

    displayMessage(text: string): void {
        this.message = text;
        setTimeout(this.displayMessage(''), 5000)
    }
}