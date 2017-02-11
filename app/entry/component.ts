import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Form } from '@angular/forms'

import { Observable } from 'rxjs'

import { Poster } from '../poster/service'
import { Messenger } from '../messenger/service'

import { Post } from '../models/post'

@Component({
    selector: '<entry>',
    templateUrl: 'app/entry/template.html',
    styleUrls: ['app/entry/style.css']
})
export class Entry implements OnInit {
    constructor(private poster: Poster,
                private messenger: Messenger) {}
    pendingPost = new Post()
    files: File[] = []


    ngOnInit(): void {
    }

    newPost() {

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