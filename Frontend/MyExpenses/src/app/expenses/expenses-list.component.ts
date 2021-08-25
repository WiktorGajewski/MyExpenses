import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { IExpense, IExpensesPage } from "./shared";

@Component({
    templateUrl: "./expenses-list.component.html"
})
export class ExpensesListComponent implements OnInit{
    pageTitle = "List of Expenses";
    expensesPage!:IExpensesPage
    expenses!:IExpense[]

    constructor(private toastr: ToastrService,
            private route: ActivatedRoute){
        
    }

    ngOnInit(): void{
        this.expensesPage = this.route.snapshot.data["expenses"]
        this.expenses = this.expensesPage.data
    }

    handleClick(expenseValue: string): void{
        this.toastr.info(expenseValue)
    }
}