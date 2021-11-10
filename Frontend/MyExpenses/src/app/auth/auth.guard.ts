import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree {
        const url = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string) : true | UrlTree {

        if(this.authService.isUserLoggedIn == true) {
            return true;
        } else {
            return this.router.parseUrl("/home");
        }
    }
}