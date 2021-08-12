import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IExpense } from "./expense.model";

@Injectable()
export class ExpenseService{
    getExpenses():Observable<IExpense[]>
    {
        let subject = new Subject<IExpense[]>()
        setTimeout(() => {subject.next(EXPENSES); subject.complete(); },
        100)

        return subject
    }

    getExpense(id:number):IExpense|undefined
    {
        return EXPENSES.find(e => e.id === id)
    }

    saveExpense(expense:IExpense)
    {
        expense.id = 999
        EXPENSES.push(expense)
    }
}

const EXPENSES:IExpense[] = [
    {
        id: 1,
        description: "I was hungry!",
        value: 40.0,
        date: new Date("11/10/2016"),
        category: 1
    },
    {
        id: 2,
        description: "I was far from home!",
        value: 10.0,
        date: new Date("11/10/2016"),
        category: 3
    }
];