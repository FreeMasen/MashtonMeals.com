import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'

import { Poster } from '../poster/service'
import { Messenger } from '../messenger/service'

import { Post } from '../models/post'

@Component({
    selector: '<dashboard>',
    templateUrl: 'app/dashboard/template.html',
    styleUrls: ['app/dashboard/style.css']
})
export class Dashboard implements OnInit { 
    recent: Post[] = []
    selectedPost: Post
    displaySelected = false
    headerImage = 'assets/images/avatar.jpg'
    constructor(
        private router: Router,
        private poster: Poster,
        private messenger: Messenger
    ) { }

    ngOnInit(): void {
        this.poster.get()
            .then((posts) => {
                this.recent = posts.slice(0,9)
            })
            .catch(function(e) {
                this.messenger.display(e.message || 'Unknow Error getting posts')
            })
    }
    selectPost(id) {
        this.selectedPost = this.recent[id]
        this.displaySelected = true
    }

    dismissPost() {
        this.displaySelected = false
    }
}
