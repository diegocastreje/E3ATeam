import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './user';
import { PaymentMethod } from './payment-method';
import config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlEndPoint: string = config.url + 'users';

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAuthorized(e): boolean{

    if(e.status==401 || e.status==403){

      this.router.navigate(['/login'])

      return true;

    }

    return false;

  }

  getPayments():Observable<PaymentMethod[]>{
    return this.http.get<PaymentMethod[]>(this.urlEndPoint+'/payment_methods').pipe(
      catchError(e => {
        
        if(this.isNoAuthorized(e)){

          return throwError(e);
          
        }

        return throwError(e);

      })
    );
  }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndPoint).pipe(
      map(response => response as User[]), 
      catchError(e => {
        
        if(this.isNoAuthorized(e)){

          return throwError(e);
          
        }

        return throwError(e);

      })
    );
  }

  getUsuario(id:number): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        
        if(this.isNoAuthorized(e)){

          return throwError(e);
          
        }

        return throwError(e);

      })
    );
  }

  create(user: User): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, user).pipe(
      catchError(e => {

        if(this.isNoAuthorized(e)){

          return throwError(e);

        }

        if (e.status == 400) {
          return throwError(e);
        }
        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  delete(user: User): Observable<any>{
    return this.http.delete<User>(`${this.urlEndPoint}/${user.user_id}`).pipe(
      catchError((e) => {

        if(this.isNoAuthorized(e)){

          return throwError(e);
          
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  update(user:User):Observable<User>{
    return this.http.put<any>(`${this.urlEndPoint}/${user.user_id}`,user).pipe(
      catchError(e => {

        if(this.isNoAuthorized(e)){

          return throwError(e);
          
        }

        if (e.status == 400) {
          return throwError(e);
        }
        if ( e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}