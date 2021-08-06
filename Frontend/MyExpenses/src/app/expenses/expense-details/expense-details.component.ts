import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ExpenseService } from "../shared/expense.service";

@Component({
    templateUrl: "./expense-details.component.html"
})
export class ExpenseDetailsComponent{
    expense: any
    
    constructor(private expenseService: ExpenseService, private route:ActivatedRoute)
    {

    }

    ngOnInit(){
        this.expense = this.expenseService.getExpense(
            +this.route.snapshot.params["id"])
    }
}