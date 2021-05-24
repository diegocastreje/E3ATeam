import { Injectable } from '@angular/core';
import{ Item } from './item';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ItemService{

  private urlEndPoint: string = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient){ }

  getItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.urlEndPoint);
  }

}
