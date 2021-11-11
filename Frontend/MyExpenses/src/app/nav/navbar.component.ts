import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "nav-bar",
    templateUrl: "./navbar.component.html"
})
export class NavBarComponent{
    isCollapsed = true;
    message: string | undefined;

    constructor(public auth:AuthService, private router: Router,
        public socialAuthService: SocialAuthService,
        private toastr: ToastrService){

    }

    public isLinkActive(url: string): boolean{
        const queryParamsIndex = this.router.url.indexOf("?");
        const baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);
        
        return baseUrl === url;
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



    