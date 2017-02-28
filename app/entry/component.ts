import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Form } from '@angular/forms'

import { Observable } from 'rxjs'

import { Poster } from '../poster/service'
import { Auth } from '../auth/service'
import { Messenger } from '../messenger/service'

import { Post } from '../models/post'

@Component({
    selector: '<entry>',
    templateUrl: 'app/entry/template.html',
    styleUrls: ['app/entry/style.css']
})
export class Entry implements OnInit {
    pendingPost = new Post()
    pendingContents: string = ''
    visible: number[] = []
    _imageOptions: string[] = []
    title = "New Post"
    titleInvalid = false
    contentsInvalid = false
    action: () => void = this.newPost
    constructor(private poster: Poster,
                private auth: Auth,
                private messenger: Messenger,
                private router: Router,
                private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.auth.checkUser()
            .then(result => {
                if (!result) {
                    this.messenger.display('Unauthoried page, re-routing to dahsboard')
                    this.router.navigate(['dashboard'])
                } else {
                    this.route.params.forEach(params => {
                        var id = params['id']
                        if (id != 'new') {
                            this.title = 'Edit Post'
                            this.action = this.updatePost
                            
                            this.poster.single(id)
                                .then(response => {
                                    this.pendingPost = response
                                    this.pendingContents = this.pendingPost.contents.join('\n##\n')
                                    response.images.forEach(_ => {
                                        this.addImageOption()
                                    })
                                })
                        }
                    })
                }
            })
    }

    updatePostContents() {
        this.pendingPost.contents = this.pendingContents.split('##').map(entry => {
            return entry.trim()
        })

    }

    validate(): boolean {
        if (this.pendingPost.title.length <= 0 ) {
            this.titleInvalid = true
            return false
        }
        if (this.pendingPost.contents.length >
            this.pendingPost.images.length - 1) {
            this.messenger.display('More contents than images, please re-evaluate', true)
            return false
        }
        if (this.pendingContents.length <= 0) {
            this.messenger.display('Contents cannot be empty', true)
            return false
        }
        if (this.pendingPost.contents.length < 
            this.pendingPost.images.length - 1) {
            this.messenger.display('More images than contents, please re-evaluate', true)
            return false
        }
        return true
    }

    newPost(): void {
        this.updatePostContents()
        if (this.validate()) {
            this.poster.post(this.pendingPost)
                .then(response => {
                    this.messenger.display(response)
                    this.router.navigate(['dashboard'])
                })
                .catch(error => {
                    this.messenger.display(error.message, true)
                })
        }
    }

    updatePost(): void {
        this.updatePostContents()
        if (this.validate()) {
            this.poster.update(this.pendingPost)
                .then(response => {
                    this.messenger.display(response)
                    this.router.navigate(['dashboard'])
                })
                .catch(message => {
                    this.messenger.display(message, true)
                })
        }
    }

    deletePost(): void {
        this.poster.delete(this.pendingPost._id)
            .then(response => {
                this.messenger.display(response)
                this.router.navigate(['dashboard'])
            })
            .catch(message => {
                this.messenger.display(message, true)
            })
    }
    
    addImages(files: File[]) {
        var self = this
        for (var i=0;i<files.length;i++) {
            self.poster.uploadImage(files[i])
                .then(response => {
                    this.pendingPost.images.push(response.json().path)
                    this.addImageOption()
                }).catch(message => {
                    self.messenger.display(message, true)
                })
        }
    }

    isVisable(i: number): boolean {
        return this.visible.includes(i)
    }

    toggleVisable(i: number): void {
        if (this.isVisable(i)) {
            this.visible = this.visible.filter(entry => {
                return entry != i
            })
        } else {
            this.visible.push(i)
        }
    }

    clickInput() {
        document.getElementById('filePahts-hidden').click()
    }

    chooseOption(dropdown: number, selection: string) {
        var current = this.pendingPost.images[dropdown]
        this.pendingPost.images[dropdown] = this.pendingPost.images[this.getIndex(selection)]
        this.pendingPost.images[this.getIndex(selection)] = current
        this.toggleVisable(dropdown)
    }

    imageOptions(i: number): string[] {
        return this._imageOptions.filter((entry, j) => {
            return i != j
        })
    }

    addImageOption() {
        if (this._imageOptions.length < 1) {
            this._imageOptions.push('Title Image')
        } else {
            this._imageOptions.push(`PostImage ${this._imageOptions.length}`)
        }
    }

    getIndex(text: string): number {
        for (var i = 0; i < this._imageOptions.length; i++) {
            var entry = this._imageOptions[i]
            if (entry == text) return i 
        }
        return -1
    }
}