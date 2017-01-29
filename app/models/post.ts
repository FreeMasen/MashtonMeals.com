export class Post {
    _id: number
    title: string
    type: string
    postDate: Date
    contents: string[]
    images: string[] 
    constructor(id: number = -1,
                title: string = '',
                type: string = 'recipe',
                postDate:Date = new Date(),
                contents: string[] = [''],
                images: string[] = []
                ) {
        this._id = id
        this.title = title
        this.type = type
        this.postDate = postDate
        this.contents = contents
        this.images = images
        
    }

    get snippet(): string {
        var trimmed = this.contents[0].substr(0,300) || ''
        return trimmed.substring(0, trimmed.lastIndexOf(' ')) + '...'
    }
}