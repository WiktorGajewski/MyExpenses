import { Component } from "@angular/core";

@Component({
  selector: "myexpenses-root",
  template: 
  `<div>
    <h1>{{pageTitle}}</h1>
    <myexpenses-expenses></myexpenses-expenses>
  </div>`
  
})

export class AppComponent {
  pageTitle: string = "MyExpenses";
}
