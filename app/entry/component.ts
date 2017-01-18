import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Form } from '@angular/forms'

import { Observable } from 'rxjs'

import { Poster } from '../poster/service'
import { Post } from '../models/post'

@Component({
    selector: '<entry>',
    templateUrl: 'app/entry/template.html',
    styleUrls: ['app/entry/style.css']
})
export class Entry implements OnInit {
    message = ''
    constructor(private poster: Poster) {}
    pendingPost = new Post()
    files: File[] = []


    ngOnInit(): void {
    }

    updateMessage(text: string) {
        if (!text) return this.message = ''
        this.message = text
        setTimeout(this.updateMessage, 5000)
    }

    newPost() {

    }
    
    addImages(files: File[]) {
        this.poster.uploadImages(files)
    }

}