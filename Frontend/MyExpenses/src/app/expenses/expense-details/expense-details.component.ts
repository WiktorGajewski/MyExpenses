import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IExpense } from "../index";

@Component({
    templateUrl: "./expense-details.component.html",
    styles:[`
        .description { 
            word-wrap: break-word;
            white-space: pre-wrap;
        }
    `]
})
export class ExpenseDetailsComponent{
    expense: IExpense|undefined;
    
    constructor(private route:ActivatedRoute, private router: Router){

    }

    ngOnInit(): void{
        this.route.data.forEach((data)=> {
            this.expense = data["expense"];

            if(!this.expense){
                this.router.navigate(["/404"]);
            }
        })
    }

    returnToList(): void{
        this.router.navigate(["/expenses"]);
    }
}