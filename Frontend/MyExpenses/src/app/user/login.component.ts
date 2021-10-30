import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { AuthService } from "./auth.service";

@Component({
    templateUrl: "./login.component.html",
    styles:[`
        em { float:right;}
    `]
})
export class LoginComponent{
    errorMessage: string | undefined

    constructor(private authService:AuthService, private router:Router, 
        public socialAuthService: SocialAuthService){

    }

    signInWithGoogle(): void{
        const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

        this.socialAuthService.signIn(socialPlatformProvider)
            .then((userData) => {                
                this.authService.signInWithGoogle(userData.idToken)

                console.log("Hello "+ userData.firstName)
                console.log("Token "+ userData.idToken)


                this.router.navigate(["expenses"])
            });
    }
}