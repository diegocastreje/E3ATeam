import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';
import config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlEndPoint: string = config.url + 'users';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndPoint);
  }

  create(user: User): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, user).pipe(
      catchError(e => {

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
    return this.http.delete<any>(`${this.urlEndPoint}/${user.user_id}`).pipe(
      catchError((e) => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
