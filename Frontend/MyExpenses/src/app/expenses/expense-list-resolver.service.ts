import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ExpenseService } from "./shared/expense.service";
import { map } from "rxjs/operators"

@Injectable()
export class ExpenseListResolver implements Resolve<any>{
    constructor(private expenseService: ExpenseService){

    }

    resolve() {
        return this.expenseService.getExpenses().pipe(map(expenses => expenses))
    }
}