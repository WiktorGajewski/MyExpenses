import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { Error401Component } from "./errors/401.component";
import { Error403Component } from "./errors/403.component";
import { Error404Component } from "./errors/404.component";
import { HomeComponent } from "./home/home.component";

import {
    CreateExpenseComponent,
    ExpenseDetailsComponent,
    ExpenseListResolver,
    ExpenseResolver,
    ExpensesListComponent,
    ExpenseStatisticsComponent,
    ExpenseStatisticsResolver
} from "./expenses/index";

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
    { path: "home", component: HomeComponent },
    { path: "404", component: Error404Component },
    { path: "403", component: Error403Component },
    { path: "401", component: Error401Component },
    { path: "", redirectTo: "expenses", pathMatch: "full" },
    { path: "**", pathMatch: "full", component: Error404Component }
]