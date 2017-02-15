import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MaterialModule } from '@angular/material'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component'
import { Router } from './router/module'

import { Dashboard } from './dashboard/component'
import { Entry } from './entry/component'
import { Login } from './login/component'
import { List } from './list/component'
import { Single } from './single/component'

import { Poster } from './poster/service'
import { Auth } from './auth/service'
import { Messenger } from './messenger/service'

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
        Auth,
        Messenger
    ],
    declarations: [
        AppComponent,
        Dashboard,
        Entry,
        Login,
        List,
        Single
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }