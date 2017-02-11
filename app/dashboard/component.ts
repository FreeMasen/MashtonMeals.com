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
    pageNumber: number = -1
    displaySelected = false
    headerImage = 'assets/images/avatar.jpg'
    constructor(
        private router: Router,
        private poster: Poster,
        private messenger: Messenger
    ) { }

    ngOnInit(): void {
        this.paginate()
            
    }
    selectPost(id) {

    }

    dismissPost() {
        this.displaySelected = false
    }

    paginate(back: boolean = false, numberOfPages: number = 1): void {
        if (back) {
            numberOfPages = -numberOfPages
        }
        this.updatePageNumber(numberOfPages)
        this.poster.get('all', this.pageNumber) 
        .then((posts) => {
                this.recent = posts
            })
            .catch(function(e) {
                this.messenger.display(e.message || 'Unknow Error getting posts')
            })
    }

    updatePageNumber(pages: number): void {
        this.pageNumber += pages
        if (this.pageNumber < 0) this.pageNumber = 0
    }
}
