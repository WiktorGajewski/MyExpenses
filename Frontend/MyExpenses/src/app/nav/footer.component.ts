import { Component } from "@angular/core";

@Component({
    selector: "footer-component",
    templateUrl: "./footer.component.html",
    styles:[`
        footer { 
            background: rgba(0,0,0,0.8);
            color: white;
            position:fixed;
            bottom:0;
            width:100%;
        }
    `]
})
export class FooterComponent{

}