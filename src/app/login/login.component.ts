import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthenticationSocialLoginService } from '../_services/authentication-social-login.service';
import { ApplicationUser } from '../_model/application-user';
import { SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    form: FormGroup;
    public submitted = false;
    public parent;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authenticationSocialLoginService: AuthenticationSocialLoginService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService: SocialAuthService) {
    }

    ngOnInit() {
        // if (this.authenticationService.getCurrentUser()) {
        //     this.router.navigate(['partnerArea']);
        // }
        this.route.params.subscribe(params => {
            this.parent = params.id;
        });
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const formControls = this.form.controls;
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialuser => {
            this.authenticationSocialLoginService.clearUser();
            this.authenticationSocialLoginService.addCurrenUser(socialuser);
            const user = new ApplicationUser();
            user.email = socialuser.email;
            user.emailConfirmed = true;
            user.phoneNumberConfirmed = false;
            user.userName = socialuser.firstName;
            user.provider = 'GOOGLE';
            user.providerId = socialuser.id;
            this.authenticationService.registerClient(user)
                        .subscribe(
                            result => {
                                this.authenticationService.clearUser();
                                this.authenticationService.addCurrenUser(result);
                                if (this.parent === '1') {
                                    return this.router.navigate(['checkout']);
                                }
                                if (this.parent === '0') {
                                    return this.router.navigate(['storecategoryproduct']);
                                }
                                // if (this.parent === '2') {
                                //         return this.router.navigate(['searchstore']);
                                // }
                            }
                        );
        });
    }
}

