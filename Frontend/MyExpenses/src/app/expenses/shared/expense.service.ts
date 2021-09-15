import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { IExpense } from "./expense.model";
import { catchError } from "rxjs/operators";
import { IExpensesPage } from "./expenses-page.model";

@Injectable()
export class ExpenseService{
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){

    }

    getExpenses(pageNumber = 1, pageSize = 3): Observable<IExpensesPage>
    {
        const params = new HttpParams()
            .set("PageNumber", pageNumber)
            .set("PageSize", pageSize);

        return this.http.get<IExpensesPage>(`${this.apiUrl}expenses`, {params})
            .pipe(catchError(this.handleError<IExpensesPage>(undefined)))
    }

    getExpense(id:number):Observable<IExpense>
    {
        return this.http.get<IExpense>(`${this.apiUrl}expenses/${id}`)
            .pipe(catchError(this.handleError<IExpense>(undefined)))
    }

    saveExpense(expense:IExpense): Observable<IExpense>
    {
        const options = { headers: new HttpHeaders({"Content-Type":"application/json"})}
        return this.http.post<IExpense>(`${this.apiUrl}expenses`, expense, options)
            .pipe(catchError(this.handleError<IExpense>(undefined)))
    }

    private handleError<T> (result?: T)
    {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T)
        }
    }
}