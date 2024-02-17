import { authStateModel } from "./auth.model";

export const authState:authStateModel={
    isLogged:false,
    loggedUser:{email:'',password:''},
    error:''
}