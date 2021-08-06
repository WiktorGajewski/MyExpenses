import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { ExpenseService } from "../shared/expense.service";

@Injectable()
export class ExpenseRouteActivator implements CanActivate{
    constructor(private expenseService: ExpenseService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot){
        const expenseExists = !!this.expenseService.getExpense(+route.params["id"])

        if(!expenseExists){
            this.router.navigate(["/404"])
        }
        return expenseExists
    }
}