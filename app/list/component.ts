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
    page: number = 0
    message: string = ''
    constructor(private poster: Poster,
                private route: ActivatedRoute,
                private location: Location) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            this.type = params['type']
            this.page = +params['page']
            this.poster.get(this.type, this.page)
                .then(posts => {
                    this.posts = posts
                })
                .catch(error => {
                    this.message = error.message
                })
        })
    }
}