import { Routes } from "@angular/router";
import { Error404Component } from "./errors/404.component";

import {
    CreateExpenseComponent,
    ExpenseDetailsComponent,
    AuthGuard,
    ExpenseListResolver,
    ExpenseResolver,
    ExpensesListComponent,
    ExpenseStatisticsComponent,
    ExpenseStatisticsResolver
} from "./expenses/index"

export const appRoutes:Routes = [
    { path: "expenses", component: ExpensesListComponent,
        resolve: {expenses: ExpenseListResolver},
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "paramsOrQueryParamsChange" },
    { path: "expenses/statistics", component: ExpenseStatisticsComponent,
        resolve: {expenses: ExpenseStatisticsResolver},
        canActivate: [AuthGuard],
        runGuardsAndResolvers: "paramsOrQueryParamsChange" },
    { path: "expenses/new", component: CreateExpenseComponent,
        canActivate: [AuthGuard],
        canDeactivate: ["canDeactivateCreateExpense"] },
    { path: "expenses/:id", component: ExpenseDetailsComponent,
        canActivate: [AuthGuard],
        resolve: {expense: ExpenseResolver} },
    { path: "404", component: Error404Component },
    { path: "", redirectTo: "expenses", pathMatch: "full" },
    { 
        path: "user",
        loadChildren: () => import("./user/user.module")
            .then(m => m.UserModule)
    },

    { path: "**", pathMatch: "full", component: Error404Component }
]