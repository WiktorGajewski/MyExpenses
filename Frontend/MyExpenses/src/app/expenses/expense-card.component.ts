import { Component, Input } from "@angular/core";

@Component({
    selector: "expense-card",
    template:
    `
    <div class="card">
        <div>Type: {{expense?.Type}}</div>
        <div>Description: {{expense?.Description}}</div>
        <div>Date: {{expense?.Date}}</div>
        <div>Value: {{expense?.Value | currency:"USD":"symbol":"1.2-2"}}</div>
    </div>
    `
})
export class ExpenseCardComponent{
    @Input() expense:any
}