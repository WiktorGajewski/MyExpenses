import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.component";

import {
    CreateExpenseComponent,
    ExpenseDetailsComponent,
    ExpenseRouteActivator,
    ExpenseListResolver,
    ExpensesListComponent
} from './expenses/index'

export const appRoutes:Routes = [
    { path: "expenses", component: ExpensesListComponent,
        resolve: {expenses: ExpenseListResolver} },
    { path: "expenses/new", component: CreateExpenseComponent,
        canDeactivate: ["canDeactivateCreateExpense"] },
    { path: "expenses/:id", component: ExpenseDetailsComponent,
        canActivate: [ExpenseRouteActivator] },
    { path: "404", component: Error404Component },
    { path: "", redirectTo: "expenses", pathMatch: "full" },
    { 
        path: "user",
        loadChildren: () => import("./user/user.module")
            .then(m => m.UserModule)
    }
]