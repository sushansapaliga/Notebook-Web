
export interface UserDetails{
    firstName: string,
    lastName: string,
    userID: string
}

export interface FeedBack{
    email: string,
    name: string,
    subject: string,
    content: string
}

export interface Notes{
    id: string,
    description: string,
    heading: string,
    linkToContent: string,
    updateTime: any,
    userID: string,
    visibility: string
}

export interface AddNotes{
    description: string,
    heading: string,
    linkToContent: string,
    updateTime: any,
    userID: string,
    visibility: string
}

export interface NotesContainer{
    id: string,
    body: string,
    linkToContent: string,
    userID: string,
    visibility: string
}

export interface AddNotesContainer{
    body: string,
    linkToContent: string,
    userID: string,
    visibility: string
}
