import { Component, Input } from "@angular/core";

@Component({
    selector: "expense-card",
    templateUrl: "./expense-card.component.html"
})
export class ExpenseCardComponent{
    @Input() expense:any
}