import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";

import { 
    IExpensesPage,
    ExpenseService
} from "../index";

@Injectable()
export class ExpenseListResolver implements Resolve<IExpensesPage>{
    constructor(private expenseService: ExpenseService){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<IExpensesPage> {
        const page = route.queryParamMap.get("page")
        const searchTerm = route.queryParamMap.get("searchTerm")
        const category = route.queryParamMap.get("category")

        if(!isNaN(Number(page)) && Number(page) > 0)
        {
            return this.expenseService.getExpenses(searchTerm, category, Number(page))
        }
        return this.expenseService.getExpenses(searchTerm, category, 1)
    }
}