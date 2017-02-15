import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Params } from '@angular/router'

import { Poster } from '../poster/service'
import { Post } from '../models/post'

@Component({
    selector: '<single>',
    templateUrl: 'app/single/template.html',
    styleUrls: ['app/single/style.css']
})
export class Single implements OnInit {
    selectedPost: Post = new Post()
    constructor(private location: Location,
                private route: ActivatedRoute,
                private poster: Poster) { }

    ngOnInit(): void {
        var id
        this.route.params.forEach(params => {
            if (params['id']) {
                id = params['id']
            }
        })
        this.poster.single(id)
            .then(post => {
                this.selectedPost = post
            })
    }
    
    get dt(): string {
        return this.selectedPost.postDate.toLocaleDateString()

    }
}