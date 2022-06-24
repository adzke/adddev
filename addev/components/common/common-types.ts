
// Application types 

export type Company = {
    id: number;
    company_name: string
};

export type User = {
    id: number,
    username: string,
    email: string,
    company_name: string
}

export type Contact = {
    id: number
    contact_name: string
    company_name: string
}

export type AuthorisationToken = string

export type AuthorisedUser = {
    user: User,
    token: AuthorisationToken
}

export type AuthorisedUserResult = {
    user: User,
    token: AuthorisationToken
    postSucessful: boolean
    errorMessage: Error
}

