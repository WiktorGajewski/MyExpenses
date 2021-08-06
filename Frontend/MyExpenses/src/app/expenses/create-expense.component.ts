import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./create-expense.component.html"
})
export class CreateExpenseComponent{
    isDirty:boolean = true

    constructor(private router: Router){

    }

    cancel(){
        this.router.navigate(["/expenses"]);
    }
}