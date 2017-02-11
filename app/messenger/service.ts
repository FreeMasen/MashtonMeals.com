import { Injectable } from '@angular/core'

@Injectable()
export class Messenger {
    listener: (string) => void = (text) => {}
    display(text: string): void {
        this.listener(text)
        setTimeout(this.listener, 5000, '')
    }

    addListener(listener: (string) => void): void {
        this.listener = listener
    }
}