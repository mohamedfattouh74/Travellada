export interface User{
    name?:string
    email:string,
    password:string,
}

export interface authStateModel{
    isLogged:boolean,
    loggedUser:User,
    error:string
}