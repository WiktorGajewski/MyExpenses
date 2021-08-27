import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { IExpense } from "./shared";

@Component({
    templateUrl: "./expenses-list.component.html",
})
export class ExpensesListComponent implements OnInit{
    pageTitle = "List of Expenses";
    expenses!:IExpense[]
    pageNumber = 1;
    totalPages!: number
    totalRecords!: number

    additionalPageLinks!: number[]

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
            this.expenses = expensesPage.data as IExpense[]
            this.pageNumber = expensesPage.pageNumber as number
            this.totalPages = expensesPage.totalPages as number
            this.totalRecords = expensesPage.totalRecords as number
            this.updatePageLinks()
        });
    }

    updatePageLinks(): void{
        const maxAdditionalPageLinks = 3
        this.additionalPageLinks = []

        if(this.totalPages < maxAdditionalPageLinks){
            for(let i = 1; i <= this.totalPages; i++){
                this.additionalPageLinks.push(i);
            }

            return;
        }

        if(this.pageNumber <= 1)
        {
            for(let i = 1; i <= maxAdditionalPageLinks; i++){
                if(i > this.totalPages){
                   break;
                }

                this.additionalPageLinks.push(i);
            }
        }
        else if(this.pageNumber >= this.totalPages)
        {
            for(let i = (this.totalPages - maxAdditionalPageLinks+1); i <= this.totalPages; i++){
                if(i < 1){
                    break;
                }

                this.additionalPageLinks.push(i);
            }
        }
        else
        {
            for(let i = this.pageNumber - 1; i <= (this.pageNumber + 1); i++){
                this.additionalPageLinks.push(i);
            } 
        }
    }

    handleClick(expenseValue: string): void{
        this.toastr.info(expenseValue)
    }
}