import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenericHttpService } from './genericHttpService';
import { ApplicationUser } from 'src/app/_model/application-user';
import { LoginUser } from '../_model/login-user-model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends GenericHttpService<any>{
    protected baseUrl = `${environment.urlApi}`;
    protected baseSite = `${environment.urlApi}`;
    // private currentUserSubject: BehaviorSubject<any>;
    public currentUser: BehaviorSubject<any>;

    constructor(private http: HttpClient) {
        super(http);
        this.currentUser = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_user')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    registerPartner(user: ApplicationUser) {
        return this.postAll('account/registerPartner', user);
    }

    registerMaster(user: LoginUser) {
        return this.postAll('account/registerMaster', user);
    }

    registerClient(user: ApplicationUser) {
        return this.postAll('account/registerClient', user);
    }

    logout() {
        localStorage.removeItem('petixco_user');
        localStorage.removeItem('petixco_user_google');
        this.currentUser.next(null);
    }

    addCurrenUser(user) {
        localStorage.setItem('petixco_user', JSON.stringify(user));
    }

    clearUser() {
        localStorage.removeItem('petixco_user');
    }

    // getByToken() {
    //     return this.get('account');
    // }

    getCurrentUser() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_user'))).getValue();
    }

    save(store: FormData) {
        return this.post('account/save', store);
    }

    login(user) {
        return this.postAll('account/login', user);
    }

}
