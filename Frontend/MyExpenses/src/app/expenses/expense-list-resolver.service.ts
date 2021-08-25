import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { IExpensesPage } from "./shared";
import { ExpenseService } from "./shared/expense.service";

@Injectable()
export class ExpenseListResolver implements Resolve<IExpensesPage>{
    constructor(private expenseService: ExpenseService){

    }

    resolve(): Observable<IExpensesPage> {
        return this.expenseService.getExpenses()
    }
}