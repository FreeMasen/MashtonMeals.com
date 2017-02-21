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
    headerImage = 'assets/images/avatar.jpg'
    pageCount = -1
    constructor(
        private router: Router,
        private poster: Poster,
        private messenger: Messenger
    ) { }

    ngOnInit(): void {
        this.paginate()
    }
    selectPost(id): void {
        this.router.navigate(['single', id])
    }

    paginate(back: boolean = false, numberOfPages: number = 1): void {
        if (back) {
            numberOfPages = -numberOfPages
        }
        this.updatePageNumber(numberOfPages)
        this.poster.get('all', this.pageNumber) 
        .then(posts => {
                this.recent = posts
            })
            .catch(function(e) {
                this.messenger.display(e.message || 'Unknow Error getting posts')
            })
        this.poster.getCount('all')
            .then(count => {
                this.pageCount = count / 9
            })
    }

    updatePageNumber(pages: number): void {
        this.pageNumber += pages
        if (this.pageNumber < 0) this.pageNumber = 0
    }

    get lastPage(): boolean {
        return (this.pageNumber + 1) >= this.pageCount
    }
}
