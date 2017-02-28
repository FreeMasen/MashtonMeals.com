import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { Poster } from '../poster/service'
import { Post } from '../models/post'
import { Auth } from '../auth/service'
import { Messenger } from '../messenger/service'

@Component({
    selector: '<single>',
    templateUrl: 'app/single/template.html',
    styleUrls: ['app/single/style.css']
})
export class Single implements OnInit {
    selectedPost: Post = new Post()
    edit: boolean = false
    constructor(private location: Location,
                private route: ActivatedRoute,
                private poster: Poster,
                private auth: Auth,
                private router: Router,
                private messenger: Messenger) { }

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
        this.auth.checkUser()
            .then(response => {
                this.edit = response
            })
    }

    editPost(): void {
        this.router.navigate(['entry', this.selectedPost._id])
    }
    
    get dt(): string {
        return this.selectedPost.postDate.toLocaleDateString()

    }
}