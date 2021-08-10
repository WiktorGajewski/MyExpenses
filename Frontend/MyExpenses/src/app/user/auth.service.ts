import { Injectable } from "@angular/core";
import { first } from "rxjs/operators";
import { IUser } from "./user.model";

@Injectable()
export class AuthService{
    currentUser:IUser|undefined

    loginUser(userName: string, password: string)
    {
        this.currentUser={
            id:1,
            userName:userName,
            firstName:"firstName",
            lastName:"lastName"
        }
    }

    isAuthenticated()
    {
        return !!this.currentUser;
    }
}