import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "src/app/user/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree {
        const url = state.url
        return this.checkLogin(url);
    }

    checkLogin(url: string) : true | UrlTree {
        console.log("checkLogin: url = " + url)
        const val = localStorage.getItem("expires_at")

        if(val != null) {
            console.log("ExpiresAt: " + val)
            return true;
        } else {
            return this.router.parseUrl("/user/login");
        }
    }
}