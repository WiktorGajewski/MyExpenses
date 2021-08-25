import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    templateUrl: "./login.component.html",
    styles:[`
        em { float:right;}
    `]
})
export class LoginComponent{
    userName: string | undefined
    password: string | undefined
    mouseoverLogin = false

    constructor(private authService:AuthService, private router:Router){

    }

    login(formValues: any): void{
        this.authService.loginUser(formValues.userName, formValues.password)
        this.router.navigate(["expenses"])
    }

    cancel(): void{
        this.router.navigate(["expenses"])
    }
}