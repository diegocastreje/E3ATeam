import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlEndPoint: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(this.urlEndPoint);
  }
}
