import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryType, ExpenseService, IExpense } from "./shared";

@Component({
    templateUrl: "./create-expense.component.html"
})
export class CreateExpenseComponent implements OnInit{
    newExpenseForm!: FormGroup
    description!: FormControl
    date!: FormControl
    value!: FormControl
    category!: FormControl

    categories!: string[]
    CategoryEnumType = CategoryType
    isDirty = true

    constructor(private router: Router, private expenseService: ExpenseService){
        
    }

    ngOnInit(): void{
        this.description = new FormControl("", [Validators.required, Validators.maxLength(200)])
        this.date = new FormControl("", Validators.required)
        this.value = new FormControl("", [Validators.required, Validators.pattern(/^[+]?([0-9]+(?:[.][0-9]{0,2})?|\.[0-9]{1,2})$/)])
        this.category = new FormControl(null, Validators.required)

        this.newExpenseForm = new FormGroup({
            description: this.description,
            date: this.date,
            value: this.value,
            category: this.category
        })

        this.categories= Object.keys(this.CategoryEnumType).filter(f => isNaN(Number(f)))
    }

    saveExpense(formValues: any): void{
        const expense: IExpense = {
            id: 0,
            description: formValues.description,
            date: new Date(formValues.date),
            value: +formValues.value,
            category: formValues.category
        }

        this.expenseService.saveExpense(expense).subscribe(() => {
            this.isDirty = false
            this.router.navigate(["/expenses"])
        });
    }

    cancel(): void{
        this.router.navigate(["/expenses"])
    }
}