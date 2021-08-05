import { Component } from "@angular/core";

@Component({
  selector: "expenses-app",
  template: 
  `<div>
    <h1>{{pageTitle}}</h1>
    <expense-list></expense-list>
  </div>`
})

export class ExpensesAppComponent {
  pageTitle: string = "MyExpenses";
}
