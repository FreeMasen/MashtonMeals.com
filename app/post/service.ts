import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { Post } from '../models/post'
import { MockPosts } from './mockPosts'

@Injectable()
export class Poster {
    constructor(private http: Http) {}

    get(type: string = undefined): Promise<Post[]> {
        var path
        if (type) {
            path = `/posts/${type}`
        } else {
            path = '/posts/all'
        }
        return this.http.get(path)
            .toPromise()
            .then(response => {
                return response.json() as Post[]
            })
    }
}