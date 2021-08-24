import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "./shared/expense.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { IExpense, IExpensesPage } from "./shared";

@Component({
    templateUrl: "./expenses-list.component.html"
})
export class ExpensesListComponent implements OnInit{
    pageTitle: string = "List of Expenses";
    expensesPage!:IExpensesPage
    expenses!:IExpense[]

    constructor(private expenseService: ExpenseService, private toastr: ToastrService,
            private route: ActivatedRoute){
        
    }

    ngOnInit(){
        this.expensesPage = this.route.snapshot.data["expenses"]
        this.expenses = this.expensesPage.data
    }

    handleClick(expenseValue: any){
        this.toastr.info(expenseValue)
    }
}