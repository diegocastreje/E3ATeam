import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import { PaymentMethod } from './payment-method';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlEndPoint: string = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndPoint);
  }

  create(user: User): Observable<any> {
    console.log("0")
    return this.http.post<any>(this.urlEndPoint, user).pipe(
      catchError(e => {

        if (e.status == 400) {
          console.log("1")
          return throwError(e);
        }
        if ( e.error.mensaje) {

          console.log("2")
          console.error(e.error.mensaje);
        }
        console.log("3")
        return throwError(e);
      })
    );
  }

  delete(user: User): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${user.user_id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(this.urlEndPoint + '/roles');
  }
  getPaymentMethods(): Observable<PaymentMethod[]>{
    return this.http.get<PaymentMethod[]>(this.urlEndPoint + '/paymentMethods');
  }
}
