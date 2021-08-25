import { Injectable } from "@angular/core";
import { IUser } from "./user.model";

@Injectable()
export class AuthService{
    currentUser:IUser|undefined

    loginUser(userName: string, password: string): void
    {
        this.currentUser={
            id:1,
            userName:userName,
            firstName:"firstName",
            lastName:"lastName"
        }
    }

    isAuthenticated(): boolean
    {
        return !!this.currentUser;
    }
}