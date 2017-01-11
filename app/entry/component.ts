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

    pendingPost = new Post()
    postTypes = ["Recipe", "Review"]

    ngOnInit(): void {

    }

    uploadPhotos() {
        
    }

      get diagnostic() { return JSON.stringify(this.pendingPost); }

}