import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "./shared/expense.service";
import { ToastrService } from "ngx-toastr";

@Component({
    templateUrl: "./expenses-list.component.html"
})
export class ExpensesListComponent implements OnInit{
    pageTitle: string = "List of Expenses";
    expenses!:any[]

    constructor(private expenseService: ExpenseService, private toastr: ToastrService){
        
    }

    ngOnInit(){
        this.expenses = this.expenseService.getExpenses()
    }

    handleClick(expenseValue: any){
        this.toastr.info(expenseValue)
    }
}