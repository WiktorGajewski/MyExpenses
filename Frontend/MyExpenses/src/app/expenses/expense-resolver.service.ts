import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ExpenseService } from "./shared/expense.service";

@Injectable()
export class ExpenseResolver implements Resolve<any>{
    constructor(private expenseService: ExpenseService){

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.expenseService.getExpense(route.params['id'])
    }
}