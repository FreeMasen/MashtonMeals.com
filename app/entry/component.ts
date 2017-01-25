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
        var self = this
        for (var i=0;i<files.length;i++) {
            self.poster.uploadImage(files[i])
                .then(response => {
                    console.log(response.json())
                    this.pendingPost.images.push(response.json().path)
                    
                }).catch(message => {
                    self.updateMessage(message)
                })
        }
    }

    get status() {
        return this.poster.queue.map(element => {
            return {
                name: element.filename,
                status: element.status
            }
        })
    }

}