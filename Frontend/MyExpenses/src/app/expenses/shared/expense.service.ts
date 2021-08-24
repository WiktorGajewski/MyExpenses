import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IExpense } from "./expense.model";
import { IExpensesPage } from "./expenses-page.model";

@Injectable()
export class ExpenseService{
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){

    }

    getExpenses():Observable<IExpensesPage>
    {
        let params = new HttpParams()
            .set("PageNumber", 1)
            .set("PageSize", 100);

        return this.http.get<IExpensesPage>(`${this.apiUrl}expenses`, {params})
            .pipe(catchError(this.handleError<IExpensesPage>("getExpenses")))
    }

    getExpense(id:number):Observable<IExpense>
    {
        return this.http.get<IExpense>(`${this.apiUrl}expenses/${id}`)
            .pipe(catchError(this.handleError<IExpense>("getExpense")))
    }

    saveExpense(expense:IExpense)
    {
        let options = { headers: new HttpHeaders({"Content-Type":"application/json"})}
        return this.http.post<IExpense>(`${this.apiUrl}expenses`, expense, options)
            .pipe(catchError(this.handleError<IExpense>("saveExpense")))
    }

    private handleError<T> (operation = "operation", result?: T)
    {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T)
        }
    }
}