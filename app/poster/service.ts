import { Injectable } from '@angular/core'
import { Http, Request, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { Post } from '../models/post'

@Injectable()
export class Poster {

    private reader: FileReader = new FileReader()
    private queue: RequestOptions[] = []
    private imageHeaders: Headers = new Headers({
        'Content-Type': 'application/octet-stream'
    })
    private clearingQueue: boolean = false
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
                    return new Post(p._id,
                                    p.title
                                    , p.type
                                    , p.postDate
                                    , p.contents
                                    , p.images)
                })
            })
    }

    uploadImages(images: File[]) {
        console.log(images);
        for (var i = 0;i<images.length;i++) {
            this.queue.push(new RequestOptions({
                method: "POST",
                url: `/new/image/${images[i].name}`,
                headers: this.imageHeaders,
                body: images[i]
            }))
        }
        if (!this.clearingQueue) {
            this.clearQueue()
        }
    }
    
    clearQueue() {
        var self = this
        if (self.queue && self.queue.length > 0) {
            self.clearingQueue = true
            var req = new Request(self.queue.slice(0,1)[0])
            self.http.request(req)
                .toPromise()
                .then(response => {
                    if (self.queue.length > 0) {
                        setTimeout(self.clearQueue, 1)
                    } else {
                        self.clearingQueue = false
                    }
                })
                .catch(error => {
                    self.clearingQueue = false
                    return error
                })
        }
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