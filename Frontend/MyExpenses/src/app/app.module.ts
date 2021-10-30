import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from "@angular/common";

import { ToastrModule } from "ngx-toastr";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { ExpensesAppComponent } from "./expenses-app.component";
import { appRoutes } from "./routes";
import { NavBarComponent } from "./nav/navbar.component";
import { FooterComponent } from "./nav/footer.component";
import { Error404Component } from "./errors/404.component";

import {
  ExpenseCardComponent,
  ExpensesListComponent,
  ExpenseDetailsComponent,
  ExpenseStatisticsComponent,
  ExpenseService,
  CreateExpenseComponent,
  ExpenseListResolver,
  CategoryPipe,
  ExpenseResolver,
  ExpenseStatisticsResolver,
  AuthGuard,
  ErrorInterceptor
} from "./expenses/index"
import { AuthService } from "./user/auth.service";
import { AuthInterceptor } from "./user/auth.interceptor";

@NgModule({
  declarations: [
    ExpensesAppComponent,
    ExpensesListComponent,
    ExpenseCardComponent,
    ExpenseDetailsComponent,
    ExpenseStatisticsComponent,
    NavBarComponent,
    FooterComponent,
    CreateExpenseComponent,
    Error404Component,
    CategoryPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: "enabled"}),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ExpenseService,
    ExpenseListResolver,
    ExpenseResolver,
    ExpenseStatisticsResolver,
    AuthService,
    DatePipe,
    AuthGuard,
    { 
      provide: "canDeactivateCreateExpense",
      useValue: checkDirtyState 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [ExpensesAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateExpenseComponent): boolean{
  if(component.IsDirty()){
    return window.confirm("You have not saved this, do you really want to cancel?")
  }
  return true
}
