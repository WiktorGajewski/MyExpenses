import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CategoryType, IExpense, IExpensesPage } from "..";


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

    amountPerCategory: CategoryValueTuple[]

    constructor(private route: ActivatedRoute){
        this.amountPerCategory = [];
    }

    ngOnInit(): void{
        this.route.data.subscribe(expenses => {
            const expensesData = expenses["expenses"] as IExpensesPage

            this.totalAmount = 0
            expensesData.data.forEach(e => this.totalAmount += e.value)

            this.fillAmountPerCategory(expensesData.data)
        });
    }

    fillAmountPerCategory(expenses: IExpense[]): void
    {
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
}