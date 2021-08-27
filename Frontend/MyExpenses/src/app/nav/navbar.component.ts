import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../user/auth.service";

@Component({
    selector: "nav-bar",
    templateUrl: "./navbar.component.html",
})
export class NavBarComponent{
    isCollapsed = true;

    constructor(public auth:AuthService, private router: Router){

    }

    public isLinkActive(url: string): boolean{
        const queryParamsIndex = this.router.url.indexOf("?");
        const baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);
        
        return baseUrl === url;
    }
}