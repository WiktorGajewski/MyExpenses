import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ExpensesAppComponent } from './expenses-app.component';
import { ExpenseCardComponent } from './expenses/expense-card.component';
import { ExpensesListComponent } from './expenses/expenses-list.component';
import { ExpenseDetailsComponent } from './expenses/expense-details/expense-details.component';
import { ExpenseService } from './expenses/shared/expense.service';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    ExpensesAppComponent,
    ExpensesListComponent,
    ExpenseCardComponent,
    ExpenseDetailsComponent,
    NavBarComponent
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
  providers: [ExpenseService],
  bootstrap: [ExpensesAppComponent]
})
export class AppModule { }
