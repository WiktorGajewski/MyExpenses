import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { IExpense, IExpensesPage } from "./shared";

@Component({
    templateUrl: "./expenses-list.component.html"
})
export class ExpensesListComponent implements OnInit{
    pageTitle = "List of Expenses";
    expenses!:IExpense[]
    pageNumber!: number
    totalPages!: number
    totalRecords!: number

    constructor(private toastr: ToastrService,
            private route: ActivatedRoute,
            private router: Router){

    }

    ngOnInit(): void{
        this.updatePage()
    }

    goToPage(newPage: number): void{
        if(newPage > 0 && newPage <= this.totalPages)
        {
            this.router.navigate(["/expenses"], { queryParams: { page: newPage } })
        }
    }

    updatePage(): void{
        this.route.data.subscribe(expenses => {
            const expensesPage = expenses["expenses"]
            this.expenses = expensesPage.data
            this.pageNumber = expensesPage.pageNumber
            this.totalPages = expensesPage.totalPages
            this.totalRecords = expensesPage.totalRecords
        });
    }

    handleClick(expenseValue: string): void{
        this.toastr.info(expenseValue)
    }
}