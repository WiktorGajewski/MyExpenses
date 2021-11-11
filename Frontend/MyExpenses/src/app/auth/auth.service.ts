import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuthentication } from "./authentication.model";

@Injectable()
export class AuthService{
    isUserLoggedIn = false;

    private readonly apiUrl = environment.apiUrl;
    
    constructor(private http: HttpClient){
        const isUserLoggedIn = localStorage.getItem("isUserLoggedIn")
        if(isUserLoggedIn != null && isUserLoggedIn == "true") {
            this.isUserLoggedIn = true;
        }
    }

    login(): void
    {
        this.isUserLoggedIn = true;
    }

    logout(): void{
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("isUserLoggedIn");
        this.isUserLoggedIn = false;
    }

    sendRequestToApi(token: string): Observable<IAuthentication>{
        return this.http.post<IAuthentication>(`${this.apiUrl}auth/google`, { token: token });
    } 

    signInWithGoogle(token: string): void{
        this.sendRequestToApi(token).subscribe(
            data => { 
                if(data.isAuthenticated){
                    this.setSession(data);
                    this.login();
                }
                else{
                    console.log("error:  401 Unauthorized");
                }
            },
            error => { console.log("error: " + error?.message || error); }
        )
    }

    setSession(authResult: IAuthentication): void{
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + authResult.durationInMinutes);

        localStorage.setItem("id_token", authResult.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt));
        localStorage.setItem("isUserLoggedIn", "true");
    }

    getExpiration(): string | null {
        const expiration = localStorage.getItem("expires_at");
        return expiration;
    }

    getToken(): string | null {
        const token = localStorage.getItem("id_token");
        return token;
    }
}