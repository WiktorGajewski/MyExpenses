import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { IExpensesPage } from "./shared";
import { ExpenseService } from "./shared/expense.service";

@Injectable()
export class ExpenseListResolver implements Resolve<IExpensesPage>{
    constructor(private expenseService: ExpenseService){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<IExpensesPage> {
        const page = route.queryParamMap.get("page")
        if(!isNaN(Number(page)) && Number(page) > 0)
        {
            return this.expenseService.getExpenses(Number(page))
        }
        return this.expenseService.getExpenses(1)
    }
}