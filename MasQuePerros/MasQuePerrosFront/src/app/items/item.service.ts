import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from './item';
import config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private urlEndPoint: string = config.url + 'items';

  constructor(private http: HttpClient, private router: Router) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.urlEndPoint);
  }
}
