import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token } from '../_model/token';
import { GenericHttpService } from './genericHttpService';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends GenericHttpService<Token>{
    protected baseUrl = `${environment.urlApi}`;
    protected baseSite = `${environment.urlApi}`;
    private currentUserSubject: BehaviorSubject<Token>;
    public currentUser: Observable<Token>;

    constructor(private http: HttpClient) {
        super(http);
        this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Token {
          return this.currentUserSubject.value;
    }

private TokenApi = 'http://localhost:51296/api/token';

login(UserName: string, Password: string, TypeUser: string): Observable<any> {
    const data = 'grant_type=password&username=' + UserName + '&password=' + Password + '&type_user=' + TypeUser;
    return this.http.post(this.TokenApi, data, { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .pipe(map(user => {
        if (user) {
           localStorage.setItem('petixco_user', JSON.stringify(user));
                  }
        return user;
    }));
}

    logout() {
        localStorage.removeItem('petixco_user');
        this.currentUserSubject.next(null);
    }

    recovery(user: Token) {
        let url: string;
        url = `${this.baseSite}`;
        const formData = new FormData();
        formData.append('user', JSON.stringify(user));
        formData.append('url', url);
        return this.http.post<any>(`${this.baseUrl}/recoveryPassword/`, formData);
    }

    verifyCode(data) {
        return this.http.post<Token>(`${this.baseUrl}/verifyCode/`, data);
    }

    changePassword(user: Token) {
        return this.http.post(`${this.baseUrl}/changePassword/`, user);
    }

    newPassword(data) {
        return this.http.post(`${this.baseUrl}/newPassword/`, data);
    }

    loadUser() {
        return new BehaviorSubject<any>(JSON.parse(localStorage.getItem('petixco_user'))).getValue();
    }

}
