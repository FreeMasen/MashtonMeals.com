import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'my-app',
    templateUrl: './app/template.html',
    styleUrls: ['./app/style.css']
})
export class AppComponent { 
    menuVis: boolean = false
    constructor(private router: Router) {}
    menuItems = [
        {path:"/recipes",
        text: "Recipes"},
        {path: "/reviews",
        text: "Reviews"},
        {path: "/entry",
        text: "New Post"}
    ]
    toggleMenu() {
        this.menuVis = !this.menuVis
    }

    goToItem(path) {
        this.router.navigate([path])
    }
}