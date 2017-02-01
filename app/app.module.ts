import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from '@angular/material'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component'
import { Router } from './router/module'

import { Dashboard } from './dashboard/component'
import { Entry } from './entry/component'

import { Poster } from './poster/service'
import { Auth } from './auth/service'

@NgModule({
    imports: [
        BrowserModule,
        Router,
        HttpModule,
        MaterialModule.forRoot(),
        FormsModule
    ],
    providers: [
        Poster,
        Auth
    ],
    declarations: [
        AppComponent,
        Dashboard,
        Entry
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }