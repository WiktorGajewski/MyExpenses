import { Component, Input } from "@angular/core";
import { IExpense } from "./shared";

@Component({
    selector: "expense-card",
    templateUrl: "./expense-card.component.html"
})
export class ExpenseCardComponent{
    @Input() expense:IExpense|undefined
}