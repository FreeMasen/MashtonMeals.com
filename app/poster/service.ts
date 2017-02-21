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

    get(type: string = 'all', page: number = 0): Promise<Post[]> {
        var path = `/posts/${type}/${page}`
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
                        url: `/image`,
                        headers: this.imageHeaders,
                        body: image
                    }
                )
            )
        ).toPromise()
    }

    getCount(type: string): Promise<number> {
        return this.http.get(`/count/${type || ''}`)
            .toPromise()
            .then(response => {
                return response.json().count
            })
    }

    post(post: Post): Promise<string> {
        post.contents = this.breakContent(post.contents[0])
        return this.http.post(`/post`,
            post)
            .toPromise()
            .then(response => {
                return response.text()
            }).catch(error => {
                return new Error('Error saving post')
            })
    }

    breakContent(content: string): Array<string> {
        return content.split("##")
    }

    single(id): Promise<Post> {
        return this.http.get(`post/${id}`)
                    .toPromise()
                    .then(response => {
                        var post = response.json()
                        return new Post(
                                    post._id,
                                    post.title,
                                    post.type,
                                    new Date(post.postDate),
                                    post.contents,
                                    post.images
                        )
                    })
    }

    update(post: Post): Promise<string> {
        return this.http.put(`post/${post._id}`, post)
            .toPromise()
            .then(response => {
                return response.json().message
            })
            .catch(error => {
                return error.message
            })
    }

    delete(id: number): Promise<string> {
        return this.http.delete(`post/${id}`)
            .toPromise()
            .then(response => {
                return response.json().message
            })
            .catch(error => {
                return error.message
            })
    }
}