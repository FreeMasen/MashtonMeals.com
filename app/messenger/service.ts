import { Injectable } from '@angular/core'

@Injectable()
export class Messenger {
    listener: (text: string, error: boolean) => void = (text) => {}
    display(text: string, error: boolean = false): void {
        this.listener(text, error)
        setTimeout(this.listener, 3000, '')
    }

    addListener(listener: (string, boolean) => void): void {
        this.listener = listener
    }
}