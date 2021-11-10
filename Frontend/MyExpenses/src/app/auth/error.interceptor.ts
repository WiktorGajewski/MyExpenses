import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if([401].indexOf(err.status) !== -1) {
                this.authService.logout();
                this.router.navigate(["/401"]);
            }
            if([403].indexOf(err.status) !== -1) {
                this.authService.logout();
                this.router.navigate(["/403"]);
            }
            if([404].indexOf(err.status) !== -1) {
                this.router.navigate(["/404"]);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}