import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { Dashboard } from '../dashboard/component'
import { Entry } from '../entry/component'
import { Login } from '../login/component'
import { List } from '../list/component'

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: Dashboard},
    {path: 'entry', component: Entry},
    {path: 'login', component: Login},
    {path: 'list/:type/:page', component: List}
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class Router { }