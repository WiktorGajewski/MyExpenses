import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { IExpense } from "./shared";
import { ExpenseService } from "./shared/expense.service";

@Injectable()
export class ExpenseResolver implements Resolve<IExpense>{
    constructor(private expenseService: ExpenseService){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<IExpense>{
        return this.expenseService.getExpense(route.params["id"])
    }
}