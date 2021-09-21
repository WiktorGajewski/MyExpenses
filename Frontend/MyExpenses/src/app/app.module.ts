import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

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
  ExpenseStatisticsResolver
} from "./expenses/index"
import { AuthService } from "./user/auth.service";

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
    ButtonsModule.forRoot()
  ],
  providers: [
    ExpenseService,
    ExpenseListResolver,
    ExpenseResolver,
    ExpenseStatisticsResolver,
    AuthService,
    { 
      provide: "canDeactivateCreateExpense",
      useValue: checkDirtyState 
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
