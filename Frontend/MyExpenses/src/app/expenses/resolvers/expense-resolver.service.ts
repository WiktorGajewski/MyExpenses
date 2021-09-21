import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";

import { 
    IExpense,
    ExpenseService 
} from "../index";

@Injectable()
export class ExpenseResolver implements Resolve<IExpense>{
    constructor(private expenseService: ExpenseService){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<IExpense>{
        const id = route.paramMap.get("id")

        if(!isNaN(Number(id))){
            return this.expenseService.getExpense(Number(id))
        }

        return this.expenseService.getExpense(-1)
    }
}