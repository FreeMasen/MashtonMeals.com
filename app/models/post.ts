export class Post {
    _id: number
    title: string
    type: string
    postDate: Date
    contents: string 
    images: string[] 
    snippet: string
    constructor(id: number,
                title: string = '',
                type: string = 'recipe',
                postDate: Date = new Date(),
                contents: string = '',
                images: string[] = ['assets/images/test.jpg']
                ) {
        this._id = id
        this.title = title
        this.type = type
        this.postDate = postDate
        this.contents = contents
        this.images = images
        var trimmed = contents.substr(0,300)
        this.snippet = trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...'
    }
}