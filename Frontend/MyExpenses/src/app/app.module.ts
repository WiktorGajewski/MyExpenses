import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ExpensesAppComponent } from './expenses-app.component';
import { ExpenseListComponent } from './expenses/expense-list.component';

@NgModule({
  declarations: [
    ExpensesAppComponent,
    ExpenseListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [ExpensesAppComponent]
})
export class AppModule { }
