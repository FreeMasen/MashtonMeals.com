import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
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
    visible: number[] = []
    _imageOptions: string[] = []
    constructor(private poster: Poster,
                private auth: Auth,
                private messenger: Messenger,
                private router: Router) {}

    ngOnInit(): void {
        this.auth.checkUser()
            .then(result => {
                if (!result) {
                    this.messenger.display('Unauthoried page, re-routing to dahsboard')
                    this.router.navigate(['dashboard'])
                }
            })
    }

    newPost() {
        this.poster.post(this.pendingPost)
            .then(response => {
                this.messenger.display(response)
                this.router.navigate(['dashboard'])
            })
            .catch(error => {
                this.messenger.display(error.message)
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
                    self.messenger.display(message)
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