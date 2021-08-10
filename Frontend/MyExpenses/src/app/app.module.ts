import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ExpensesAppComponent } from './expenses-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';

import {
  ExpenseCardComponent,
  ExpensesListComponent,
  ExpenseDetailsComponent,
  ExpenseService,
  CreateExpenseComponent,
  ExpenseRouteActivator,
  ExpenseListResolver
} from './expenses/index'
import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    ExpensesAppComponent,
    ExpensesListComponent,
    ExpenseCardComponent,
    ExpenseDetailsComponent,
    NavBarComponent,
    CreateExpenseComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    ExpenseService,
    ExpenseRouteActivator,
    ExpenseListResolver,
    AuthService,
    { 
      provide: "canDeactivateCreateExpense",
      useValue: checkDirtyState 
    }
  ],
  bootstrap: [ExpensesAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateExpenseComponent) {
  if(component.isDirty){
    return window.confirm("You have not saved this, do you really want to cancel?")
  }
  return true
}
