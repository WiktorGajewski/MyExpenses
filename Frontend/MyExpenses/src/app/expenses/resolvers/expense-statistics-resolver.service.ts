import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";

import { 
    ExpenseService,
    IExpensesPage
} from "../index";

@Injectable()
export class ExpenseStatisticsResolver implements Resolve<IExpensesPage>{
    constructor(private expenseService :ExpenseService, private datePipe: DatePipe){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<IExpensesPage>{
        const category = route.queryParamMap.get("category");
        let startDate = route.queryParamMap.get("startDate");
        let endDate = route.queryParamMap.get("endDate");

        if(!startDate)
        {
            const date = new Date();
            date.setMonth(date.getMonth() - 1);
            startDate = this.datePipe.transform(date, "yyyy-MM-dd");
        }   

        if(!endDate)
        {
            const date = new Date();
            endDate = this.datePipe.transform(date, "yyyy-MM-dd");
        }

        return this.expenseService.getExpenseStatistics(category, startDate, endDate);
    }
}