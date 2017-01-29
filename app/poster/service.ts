import { Injectable } from '@angular/core'
import { Http, Request, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { Post } from '../models/post'

@Injectable()
export class Poster {

    private reader: FileReader = new FileReader()
    private imageHeaders: Headers = new Headers({
        'Content-Type': 'application/octet-stream'
    })
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
                return response.json().map(p => {
                    if (typeof p.postDate == 'string') p.postDate = new Date(p.postDate)
                    return new Post(p._id
                                    , p.title
                                    , p.type
                                    , p.postDate
                                    , p.contents
                                    , p.images)
                })
            })
            .catch(error => {
                console.error('error in get with path ' + path)
                console.error(error.message)

            })
    }

    uploadImage(image: File) {
        return this.http.request(new Request(
                        new RequestOptions({
                        method: "POST",
                        url: `/image/${image.name}`,
                        headers: this.imageHeaders,
                        body: image
                    }
                )
            )
        ).toPromise()
        .then(response => {
            return response
        })
        .catch(error => {
            console.error(error.message)
        })
    }

    post(post: Post) {
        return this.http.post(`new/post`,
            post)
            .toPromise()
            .then(response => {
                return response
            })
    }
}