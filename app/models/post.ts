export class Post {
    title: string
    type: string
    contents: string 
    images: string[] 
    snippet: string
    constructor(title: string = '',
                type: string = 'recipe',
                contents: string = '',
                images: string[] = ['assets/images/test.jpg']
                ) {
        this.title = title
        this.type = type
        this.contents = contents
        this.images = images
        var trimmed = contents.substr(0,150)
        this.snippet = trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...'
    }
}