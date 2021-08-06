import { Routes } from "@angular/router";
import { ExpenseDetailsComponent } from "./expenses/expense-details/expense-details.component";
import { ExpensesListComponent } from "./expenses/expenses-list.component";

export const appRoutes:Routes = [
    { path: "expenses", component: ExpensesListComponent },
    { path: "expenses/:id", component: ExpenseDetailsComponent },
    { path: "", redirectTo: "expenses", pathMatch: "full" }
]