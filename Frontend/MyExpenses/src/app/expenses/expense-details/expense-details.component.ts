import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IExpense } from "../shared";
import { ExpenseService } from "../shared/expense.service";

@Component({
    templateUrl: "./expense-details.component.html"
})
export class ExpenseDetailsComponent{
    expense: IExpense|undefined
    
    constructor(private route:ActivatedRoute, private router: Router){

    }

    ngOnInit(): void{
        this.route.data.forEach((data)=> {
            this.expense = data["expense"]

            if(!this.expense){
                this.router.navigate(["/404"])
            }
        })
    }
}