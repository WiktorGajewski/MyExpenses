import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryType, IExpense, IExpensesPage } from "../index";


class CategoryValueTuple{
    category: CategoryType;
    value: number;

    public constructor(category: CategoryType, value: number)
    {
        this.category = category
        this.value = value
    }
}

@Component({
    templateUrl: "./expense-statistics.component.html"

})
export class ExpenseStatisticsComponent implements OnInit
{
    totalAmount!: number
    amountPerCategory!: CategoryValueTuple[]

    searchForm!: FormGroup
    category!: FormControl
    startDate!: FormControl
    endDate!: FormControl

    searchCategory: string|undefined
    searchStartDate: string|undefined
    searchEndDate: string|undefined

    categories!: string[]
    CategoryEnumType = CategoryType

    constructor(private route: ActivatedRoute, private router: Router, private datePipe: DatePipe){

    }

    ngOnInit(): void{
        this.route.data.subscribe(expenses => {
            const expensesData = expenses["expenses"] as IExpensesPage

            this.totalAmount = 0
            expensesData.data.forEach(e => this.totalAmount += e.value)

            this.fillAmountPerCategory(expensesData.data)

            
            const defaultDate = new Date()

            this.searchCategory = this.route.snapshot.queryParams["category"]
            this.searchStartDate = this.route.snapshot.queryParams["startDate"] || this.datePipe.transform(new Date().setMonth(defaultDate.getMonth() - 1), "yyyy-MM-dd")
            this.searchEndDate = this.route.snapshot.queryParams["endDate"] || this.datePipe.transform(defaultDate, "yyyy-MM-dd")
        });

        this.category = new FormControl(this.searchCategory)
        this.startDate = new FormControl(this.searchStartDate)
        this.endDate = new FormControl(this.searchEndDate)
        this.searchForm = new FormGroup({
            category: this.category,
            startDate: this.startDate,
            endDate: this.endDate
        })
        this.categories= Object.keys(this.CategoryEnumType).filter(f => isNaN(Number(f)))
    }

    fillAmountPerCategory(expenses: IExpense[]): void
    {
        this.amountPerCategory = [];

        expenses.forEach(expense => {
            const index = this.amountPerCategory.findIndex((c => c.category === expense.category))

            if(index === -1){
                const newCategory = new CategoryValueTuple(expense.category, expense.value)
                this.amountPerCategory.push(newCategory)
            }
            else {
                this.amountPerCategory[index].value += expense.value
            }
        });
        this.amountPerCategory.sort((a,b) => b.value - a.value)
    }

    filter(formValues: any): void{
        this.router.navigate(["/expenses/statistics"], {
             queryParams: { category: formValues.category, startDate: formValues.startDate, endDate: formValues.endDate 
            } })
    }
}