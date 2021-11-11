import { IExpense } from "./expense.model";

export interface IExpensesPage
{
    pageNumber: number
    pageSize: number
    totalPages: number
    totalRecords: number
    data: IExpense[]
}