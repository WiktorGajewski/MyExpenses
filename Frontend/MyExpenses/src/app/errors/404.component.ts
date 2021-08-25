import { Component } from "@angular/core";

@Component({
    template:`
    <h1 class="errorMessage alert-danger mt-5">404 Not Found</h1>
    `,
    styles: [`
        .errorMessage {
            text-align: center;
        }
    `]
})
export class Error404Component{

}