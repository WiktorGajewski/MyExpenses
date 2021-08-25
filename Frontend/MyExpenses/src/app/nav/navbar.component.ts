import { Component } from "@angular/core";
import { AuthService } from "../user/auth.service";

@Component({
    selector: "nav-bar",
    templateUrl: "./navbar.component.html",
})
export class NavBarComponent{
    isCollapsed = true;

    constructor(public auth:AuthService){

    }
}