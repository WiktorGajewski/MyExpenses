import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";

import { 
    ExpenseService,
    IExpensesPage
} from "../index";

@Injectable()
export class ExpenseStatisticsResolver implements Resolve<IExpensesPage>{
    constructor(private expenseService :ExpenseService){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<IExpensesPage>{
        const searchTerm = route.queryParamMap.get("searchTerm")
        const category = route.queryParamMap.get("category")

        return this.expenseService.getExpenseStatistics(searchTerm, category)
    }
}