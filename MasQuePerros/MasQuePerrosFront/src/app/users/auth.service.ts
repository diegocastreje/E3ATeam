import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../orders/models/order';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User | undefined;
  private _token: string | undefined;

  constructor(private http: HttpClient) {}

  public get user(): User | undefined {
    if (this._user != null) {
      return this._user;
    }

    if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user') || '');
      return this._user;
    }

    return new User();
  }

  public get token(): string | undefined {
    if (this._token != null) {
      return this._token;
    }

    if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || undefined;
      return this._token;
    }

    return undefined;
  }

  login(user: User): Observable<any> {
    const urlEndPoint = 'http://localhost:8081/oauth/token';
    const credenciales = btoa('MasQuePerrosFront' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales,
    });

    const params = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)
      .set('grant_type', 'password');

    return this.http.post<any>(urlEndPoint, params.toString(), {
      headers: httpHeaders,
    });
  }

  logout(): void {
    this._token = undefined;
    this._user = undefined;
    sessionStorage.clear();
  }

  saveUser(access_token: string): void {
    let payload = this.getTokenData(access_token);

    this._user = new User();
    this._user.first_name = payload.first_name;
    this._user.middle_name = payload.middle_name;
    this._user.last_name = payload.last_name;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.role = payload.authorities;

    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem('token', JSON.stringify(this._token));
  }

  saveShoppingList(user: User): void {
    var order = new Order();
    order.user = user;
    sessionStorage.setItem('shoppingList', JSON.stringify(order));
  }

  getTokenData(access_token: string): any {
    if (access_token != null && access_token != "") {
      return JSON.parse(atob(access_token.split('.')[1]));
    }
    return null;
  }

  public getUserData(): User {
    return JSON.parse(sessionStorage.getItem('user')|| "");
  }

  isAuthenticated(): boolean {
    let payload = this.getTokenData(this.token || '');

    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }

    return false;
  }

  hasRole(role: string): boolean {
    if (this.user != null && this.user.role.includes(role)) {
      return true;
    }

    return false;
  }
}
