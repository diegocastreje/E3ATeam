import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlEndPoint: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.urlEndPoint);
  }
}
