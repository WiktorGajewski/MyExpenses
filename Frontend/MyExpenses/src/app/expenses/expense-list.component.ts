import { Component } from "@angular/core";

@Component({
    selector: "myexpenses-expenses",
    templateUrl: "./expense-list.component.html"
})
export class ExpenseListComponent{
    pageTitle: string = "Expense list";
    listFilter: string = "";
    expenses: any[] = [
        {
            "Id": 1,
            "Type": "Food",
            "Description": "I was hungry!",
            "Value": 40.0,
            "Date": "11/10/2016",
        },
        {
            "Id": 2,
            "Type": "Transport",
            "Description": "I was far from home!",
            "Value": 10.0,
            "Date": "11/10/2016"
        }
    ];
}