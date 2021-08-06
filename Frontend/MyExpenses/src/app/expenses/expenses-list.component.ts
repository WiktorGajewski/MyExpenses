import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "./shared/expense.service";

@Component({
    selector: "expenses-list",
    templateUrl: "./expenses-list.component.html"
})
export class ExpensesListComponent implements OnInit{
    pageTitle: string = "List of Expenses";
    //listFilter: string = "";
    expenses!:any[]

    constructor(private expenseService: ExpenseService){
        
    }

    ngOnInit(){
        this.expenses = this.expenseService.getExpenses()
    }
}