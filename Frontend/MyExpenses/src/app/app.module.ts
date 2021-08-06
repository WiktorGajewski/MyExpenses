import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// import { ModalModule } from 'ngx-bootstrap/modal';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { ExpensesAppComponent } from './expenses-app.component';
import { ExpenseCardComponent } from './expenses/expense-card.component';
import { ExpensesListComponent } from './expenses/expenses-list.component';
import { ExpenseService } from './expenses/shared/expense.service';
import { NavBarComponent } from './nav/navbar.component';

@NgModule({
  declarations: [
    ExpensesAppComponent,
    ExpensesListComponent,
    ExpenseCardComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
    // ModalModule.forRoot(),
    // BsDropdownModule.forRoot(),
    // TooltipModule.forRoot()
  ],
  providers: [ExpenseService],
  bootstrap: [ExpensesAppComponent]
})
export class AppModule { }
