import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from './item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private urlEndPoint: string = 'http://localhost:8081/api/items';

  constructor(private http: HttpClient, private router: Router) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.urlEndPoint);
  }
}
