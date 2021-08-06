import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "./shared/expense.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./expenses-list.component.html"
})
export class ExpensesListComponent implements OnInit{
    pageTitle: string = "List of Expenses";
    expenses!:any[]

    constructor(private expenseService: ExpenseService, private toastr: ToastrService,
            private route: ActivatedRoute){
        
    }

    ngOnInit(){
        this.expenses = this.route.snapshot.data["expenses"]
    }

    handleClick(expenseValue: any){
        this.toastr.info(expenseValue)
    }
}