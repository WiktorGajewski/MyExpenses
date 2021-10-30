import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { ProfileComponent } from "./profile.component";
import { userRoutes } from "./user.routes";
import { environment } from "src/environments/environment";

import { 
    SocialLoginModule,
    SocialAuthServiceConfig,
    GoogleLoginProvider
} from "angularx-social-login";

const CLIENT_ID = environment.authClientId;

@NgModule({
    declarations: [
        ProfileComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(userRoutes),
        SocialLoginModule
    ],
    providers: [
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
    ]
})
export class UserModule { }