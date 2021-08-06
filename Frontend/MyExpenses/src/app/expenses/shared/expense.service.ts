import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ExpenseService{
    getExpenses()
    {
        let subject = new Subject()
        setTimeout(() => {subject.next(EXPENSES); subject.complete(); },
        100)

        return subject
    }

    getExpense(id:number)
    {
        return EXPENSES.find(e => e.Id === id)
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