import { Component } from '@angular/core'

@Component({
    selector: 'my-app',
    templateUrl: './app/template.html',
    styleUrls: ['./app/style.css']
})
export class AppComponent { 
    menuVis: boolean = false
    menuItems = [
        {path:"/recipes",
        text: "Recipes"},
        {path: "/reviews",
        text: "Reviews"}
    ]
    toggleMenu() {
        this.menuVis = !this.menuVis
    }

    goToItem(path) {
        console.log(path)
    }
}