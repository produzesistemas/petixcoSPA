import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthenticationSocialLoginService } from '../_services/authentication-social-login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authenticationSocialLoginService: AuthenticationSocialLoginService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getCurrentUser();
        const expectedRole = route.data.expectedRole;

        if (!currentUser) {
           this.router.navigate(['/login/0']);
           return false;
        }
        if (state.url === '/' || state.url === '/access-denied') {
            return true;
        }

        if (expectedRole.length === 0) {
            return this.accessDenied();
        }
        // let found = false;

        // if (currentUser.role instanceof Array) {
        //     expectedRole.forEach((e: string) => {
        //         if (currentUser.role.find(r => r === e) != null) {
        //             found = true;
        //             return;
        //         }
        //     });
        // } else {
        //     if (expectedRole.find(r => r === currentUser.role) != null) {
        //         return true;
        //     }
        // }
        return true;
    }

    accessDenied() {
        this.authenticationService.clearUser();
        this.authenticationSocialLoginService.clearUser();
        this.router.navigate(['/login/0']);
        return false;
    }
}
