import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from '@angular/material'
import { HttpModule } from '@angular/http'


import { AppComponent } from './app.component'
import { Router } from './router/module'

import { Dashboard } from './dashboard/component'
import { Poster } from './post/service'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        HttpModule,
        MaterialModule.forRoot()
    ],
    providers: [
        Poster
    ],
    declarations: [
        AppComponent,
        Dashboard
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }