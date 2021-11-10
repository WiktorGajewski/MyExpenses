import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { environment } from "src/environments/environment";

import { ToastrModule } from "ngx-toastr";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { 
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider
} from "angularx-social-login";

import { ExpensesAppComponent } from "./expenses-app.component";
import { appRoutes } from "./routes";
import { NavBarComponent } from "./nav/navbar.component";
import { FooterComponent } from "./nav/footer.component";
import { Error401Component } from "./errors/401.component";
import { Error403Component } from "./errors/403.component";
import { Error404Component } from "./errors/404.component";

import { AuthService } from "./auth/auth.service";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { AuthGuard } from "./auth/auth.guard";
import { ErrorInterceptor } from "./auth/error.interceptor";

import { HomeComponent } from "./home/home.component";

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
} from "./expenses/index";

const CLIENT_ID = environment.authClientId;

@NgModule({
  declarations: [
    HomeComponent,
    ExpensesAppComponent,
    ExpensesListComponent,
    ExpenseCardComponent,
    ExpenseDetailsComponent,
    ExpenseStatisticsComponent,
    NavBarComponent,
    FooterComponent,
    CreateExpenseComponent,
    Error401Component,
    Error403Component,
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
    HttpClientModule,
    SocialLoginModule
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
    },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig,
  }
  ],
  bootstrap: [ExpensesAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateExpenseComponent): boolean{
  if(component.IsDirty()){
    return window.confirm("You have not saved this, do you really want to cancel?");
  }
  return true;
}
