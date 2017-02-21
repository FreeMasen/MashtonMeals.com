import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import { Observable } from 'rxjs'

import { Poster } from '../poster/service'
import { Post } from '../models/post'


@Component({
    selector: '<list>',
    templateUrl: 'app/list/template.html',
    styleUrls: ['app/list/style.css']
})
export class List implements OnInit {
    posts: Post[] = []
    type: string = ''
    page: number = -1
    pageLimit: number = -1
    message: string = ''
    constructor(private poster: Poster,
                private route: ActivatedRoute,
                private location: Location) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.type = params['type']
            if (+params['page'] != 0) {
                this.page = +params['page'] - 1
            }
        })
        this.paginate()
    }

    paginate(back: boolean = false, numberOfPages: number = 1): void {
        if (back) {
            numberOfPages = -numberOfPages
        }
        this.updatePageNumber(numberOfPages)
        this.poster.get(this.type, this.page) 
        .then(posts => {
                this.posts = posts
            })
            .catch(function(e) {
                this.messenger.display(e.message || 'Unknow Error getting posts')
            })
        this.poster.getCount(this.type)
            .then(count => {
                this.pageLimit = count / 9
            })
    }
    updatePageNumber(pages: number): void {
        this.page += pages
        console.log(this.page)
        if (this.page < 0) this.page = 0
    }

    get lastPage(): boolean {
        return (this.page + 1) >= this.pageLimit
    }
}