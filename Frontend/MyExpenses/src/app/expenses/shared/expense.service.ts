import { Injectable } from "@angular/core";

@Injectable()
export class ExpenseService{
    getExpenses()
    {
        return EXPENSES
    }
}

const EXPENSES = [
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