import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationSocialLoginService{
    public currentUserGoogle: BehaviorSubject<any>;

    constructor() {
        this.currentUserGoogle = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_user_google')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    logout() {
        localStorage.removeItem('petixco_user_google');
        this.currentUserGoogle.next(null);
    }

    addCurrenUser(user) {
        localStorage.setItem('petixco_user_google', JSON.stringify(user));
    }

    clearUser() {
        localStorage.removeItem('petixco_user_google');
    }



    getCurrentUser() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_user_google'))).getValue();
    }

}
