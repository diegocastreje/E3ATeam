import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLSearchParams } from 'url';
import { User } from './user';

@Injectable({

  providedIn: 'root'

})

export class AuthService {

  private _user: User = new User();

  private _token: string = '';

  constructor(private http: HttpClient) {}

    public get user(): User {

      if(this._user != null){

        return this._user;

      } else if(this._user == null && sessionStorage.getItem('user') != null){

        this._user = JSON.parse(sessionStorage.getItem('user')) as User;

        return this._user;

      }

      return new User();

    }

    public get token(): string {

      if(this._token != null){

        return this._token;

      } else if(this._token == null && sessionStorage.getItem('token') != null){

        this._token = sessionStorage.getItem('token');

        return this._token;

      }

      return null;

    }

  

  login(user:User): Observable<any>{
  
    const urlEndpoint = 'http://localhost8081/oauth/token';
  
    const credentials = btoa('MasQuePerrosFront' + ':' + '12345');
  
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credentials});
  
    let params = new URLSearchParams();
  
    params.set('grant_type', 'password');
  
    params.set('email', user.email);
  
    params.set('password', user.password);

    console.log(params.toString());
  
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});

  }

  saveUser(accessToken: string):void{

    let payload = this.importTokenData(accessToken);

    this._user = new User();

    this._user.first_name = payload.first_name;

    this._user.middle_name = payload.middle_name;

    this._user.last_name = payload.last_name;

    this._user.email = payload.email;

    this._user.username = payload.user_name;

    this._user.role = payload.authorities;

    sessionStorage.setItem('user', JSON.stringify(this._user));

  }

  saveToken(accessToken: string):void{

    this._token = accessToken;

    sessionStorage.setItem('token', accessToken);

    
  }

  importTokenData(accessToken: string):any{

    if(accessToken != null){

      return JSON.parse(atob(accessToken.split(".")[1]));

    }

    return null;

  }

  isAuthenticated(): boolean {

    let payload = this.importTokenData(this.token);

    if(payload != null && payload.user_name && payload.user_name.length>0){

      return true;

    }

    return false;

  }

  logout(): void {

    this._token = null;

    this._user = null;
    
    sessionStorage.clear();

    sessionStorage.removeItem('token');

    sessionStorage.removeItem('user');

  }

}