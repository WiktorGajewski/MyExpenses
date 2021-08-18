import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ExpenseService } from "./shared/expense.service";

@Injectable()
export class ExpenseListResolver implements Resolve<any>{
    constructor(private expenseService: ExpenseService){

    }

    resolve() {
        return this.expenseService.getExpenses()
    }
}