import { Component } from "@angular/core";

@Component({
  selector: "expenses-app",
  template: 
  `
      <nav-bar></nav-bar>
      <router-outlet></router-outlet>
      <footer-component></footer-component>
  `
})

export class ExpensesAppComponent {

}
