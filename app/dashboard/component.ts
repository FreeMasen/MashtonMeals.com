import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'

import { Poster } from '../post/service'
import { Post } from '../models/post'

@Component({
    selector: '<dashboard>',
    templateUrl: 'app/dashboard/template.html',
    styleUrls: ['app/dashboard/style.css']
})
export class Dashboard implements OnInit { 
    message: string 
    recipes: Post[] = []
    reviews: Post[] = []
    constructor(
        private router: Router,
        private poster: Poster
    ) {
        this.message = ''
    }

    ngOnInit(): void {
        this.poster.get()
            .then((posts) => {
                posts.forEach(post => {
                    if (post.type == 'recipe') {
                        this.recipes.push(post)
                    } else {
                        this.reviews.push(post)
                    }
                })
            })
            .catch(function(e) {
                console.log(e)
            })
    }
}
