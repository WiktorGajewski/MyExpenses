import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";

@Component({
    templateUrl: "./home.component.html"
})
export class HomeComponent {
    constructor(public auth:AuthService, private router: Router,
        public socialAuthService: SocialAuthService,
        private toastr: ToastrService){

    }

    signInWithGoogle(): void{
        const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

        this.socialAuthService.signIn(socialPlatformProvider)
            .then((userData) => {                
                this.auth.signInWithGoogle(userData.idToken);

                this.handleToastr("Hello "+ userData.firstName);
            });
    }

    logout() : void {
        this.auth.logout();
    }

    handleToastr(message: string|undefined): void{
        this.toastr.success(message);
    }
}