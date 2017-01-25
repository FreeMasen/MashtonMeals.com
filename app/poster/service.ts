import { Injectable } from '@angular/core'
import { Http, Request, Response, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/toPromise'

import { Post } from '../models/post'

@Injectable()
export class Poster {

    private reader: FileReader = new FileReader()
    queue: any[] = []
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
        for (var i = 0;i<images.length;i++) {
            this.queue.push({
                request: new RequestOptions({
                        method: "POST",
                        url: `/new/image/${images[i].name}`,
                        headers: this.imageHeaders,
                        body: images[i]}),
                name: images[i].name,
                size: images[i].size,
                status: 'unsent',
                response: ''
            })
        }
        if (!this.clearingQueue) {
            this.clearQueue()
        }
    }

    uploadImage(image: File) {
        return this.http.request(new Request(
                        new RequestOptions({
                        method: "POST",
                        url: `/new/image/${image.name}`,
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
            return error
        })
    }
    
    clearQueue() {
        var self = this
        if (self.queue && self.queue.length > 0) {
            self.clearingQueue = true

            var element = self.queue.filter(element => {
                return element.status == 'unsent'
            })[0]
            element.status = 'sending'
            console.log(`sending request for ${element.name}`)
            self.http.request(new Request(element.request))
                .toPromise()
                .then(response => {
                    element.status = 'completed'
                    element.response = response.toString()
                    if (self.queue.length > 0) {
                        setTimeout(self.clearQueue, 1)
                    } else {
                        self.clearingQueue = false
                    }
                    return element
                })
                .catch(error => {
                    self.clearingQueue = false
                    return error
                })
            return element
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

    get status(): number {
        return this.queue.filter(element => {
            return element.status == 'completed'
        }).map(element => {
            return element.size
        }).reduce((a, b) => {
            return a + b
        },0) /
        this.queue.map(element => {
            return element.size
        }).reduce((a, b) => {
            return a + b
        },0)
    }
}