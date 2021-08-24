import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ExpenseService, IExpense } from "./shared";

@Component({
    templateUrl: "./create-expense.component.html",
    styles: [`
        em {float:right;}
        .error input, .error select, .error textarea {background-color:#ffa5a5;}
    `]
})
export class CreateExpenseComponent implements OnInit{
    newExpenseForm!: FormGroup
    description!: FormControl
    date!: FormControl
    value!: FormControl
    category!: FormControl

    isDirty:boolean = true

    constructor(private router: Router, private expenseService: ExpenseService){

    }

    ngOnInit(){
        this.description = new FormControl("", [Validators.required, Validators.maxLength(200)])
        this.date = new FormControl("", Validators.required)
        this.value = new FormControl("", Validators.required)

        this.newExpenseForm = new FormGroup({
            description: this.description,
            date: this.date,
            value: this.value,
            category: this.category
        })
    }

    saveExpense(formValues:any){
        let expense: IExpense = {
            id: 0,
            description: formValues.description,
            date: new Date(formValues.date),
            value: +formValues.value,
            category: +formValues.category
        }

        this.expenseService.saveExpense(expense).subscribe(() => {
            this.isDirty = false
            this.router.navigate(["/expenses"])
        });
    }

    cancel(){
        this.router.navigate(["/expenses"])
    }
}