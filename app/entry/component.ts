import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Form } from '@angular/forms'

import { Observable } from 'rxjs'

import { Poster } from '../poster/service'
import { Auth } from '../auth/service'
import { Messenger } from '../messenger/service'

import { Post } from '../models/post'

@Component({
    selector: '<entry>',
    templateUrl: 'app/entry/template.html',
    styleUrls: ['app/entry/style.css']
})
export class Entry implements OnInit {
    pendingPost = new Post()
    files: File[] = []
    constructor(private poster: Poster,
                private auth: Auth,
                private messenger: Messenger,
                private router: Router) {}

    ngOnInit(): void {
        this.auth.checkUser()
            .then(result => {
                if (!result) {
                    this.messenger.display('Unauthoried page, re-routing to dahsboard')
                    this.router.navigate(['dashboard'])
                }
            })
    }

    newPost() {
        this.poster.post(this.pendingPost)
            .then(response => {
                this.messenger.display(response)
            })
    }
    
    addImages(files: File[]) {
        var self = this
        for (var i=0;i<files.length;i++) {
            self.poster.uploadImage(files[i])
                .then(response => {
                    console.log(response.json())
                    this.pendingPost.images.push(response.json().path)
                }).catch(message => {
                    self.messenger.display(message)
                })
        }
    }
}