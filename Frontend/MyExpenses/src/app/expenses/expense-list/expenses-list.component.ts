import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { CategoryType, IExpense } from "../index";

@Component({
    templateUrl: "./expenses-list.component.html",
    styles:[`
        .pagination > li > a { 
            background-color: black;
            border-color: black
        }

        .pagination > .disabled > a { 
            background-color: #C0C0C0;
        }

        .pagination > li > a:hover { 
            background-color: #800000;
            color: white;
        }
        .pagination > .active > a { 
            background-color: #006400;
        }
    `]
})
export class ExpensesListComponent implements OnInit{
    pageTitle = "Expenses";
    expenses!:IExpense[]
    pageNumber = 1;
    totalPages!: number
    totalRecords!: number

    additionalPageLinks!: number[]

    searchTermForm!: FormGroup
    searchByTerm!: FormControl
    searchByCategory!: FormControl

    searchTerm: string|undefined
    searchCategory: string|undefined

    categories!: string[]
    CategoryEnumType = CategoryType

    constructor(private toastr: ToastrService,
            private route: ActivatedRoute,
            private router: Router){

    }

    ngOnInit(): void{
        this.updatePage()

        const message = this.route.snapshot.queryParams["message"]

        if(message)
        {
            this.handleToastr(message)
        }

        this.searchTerm = this.route.snapshot.queryParams["searchTerm"]
        this.searchCategory = this.route.snapshot.queryParams["category"]

        this.searchByTerm = new FormControl(this.searchTerm)
        this.searchByCategory = new FormControl(this.searchCategory)
        this.searchTermForm = new FormGroup({
            searchByTerm: this.searchByTerm,
            searchByCategory: this.searchByCategory
        })

        this.categories= Object.keys(this.CategoryEnumType).filter(f => isNaN(Number(f)))
    }

    handleToastr(message: string|undefined): void{
        this.toastr.success(message)
    }

    goToPage(newPage: number): void{
        if(newPage > 0)
        {
            window.scrollTo(0,0)
            this.router.navigate(["/expenses"], { queryParams: { page: newPage, searchTerm: this.searchTerm, category: this.searchCategory } })
        }
    }

    filter(formValues: any): void{
        this.searchTerm = formValues.searchByTerm;
        this.searchCategory = formValues.searchByCategory
        this.router.navigate(["/expenses"], { queryParams: { page: this.pageNumber, searchTerm: this.searchTerm, category: this.searchCategory } })
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
}