import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLSearchParams } from 'url';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

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

}