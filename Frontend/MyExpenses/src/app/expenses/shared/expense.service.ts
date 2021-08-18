import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IExpense } from "./expense.model";

@Injectable()
export class ExpenseService{
    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){

    }

    getExpenses():Observable<IExpense[]>
    {
        return this.http.get<IExpense[]>(`${this.apiUrl}expenses`)
            .pipe(catchError(this.handleError<IExpense[]>("getExpenses", [])))
    }

    getExpense(id:number):Observable<IExpense>
    {
        return this.http.get<IExpense>(`${this.apiUrl}expenses/${id}`)
            .pipe(catchError(this.handleError<IExpense>("getExpense")))
    }

    saveExpense(expense:IExpense)
    {
        let options = { headers: new HttpHeaders({'Content-Type':'application/json'})}
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

const EXPENSES:IExpense[] = [
    {
        id: 1,
        description: "I was hungry!",
        value: 40.0,
        date: new Date("11/10/2016"),
        category: 1
    },
    {
        id: 2,
        description: "I was far from home!",
        value: 10.0,
        date: new Date("11/10/2016"),
        category: 3
    }
];