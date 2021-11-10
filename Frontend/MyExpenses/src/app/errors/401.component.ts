import { Component } from "@angular/core";

@Component({
    template:`
    <h1 class="errorMessage alert-danger mt-5">401 Unauthorized</h1>
    `,
    styles: [`
        .errorMessage {
            text-align: center;
        }
    `]
})
export class Error401Component{

}