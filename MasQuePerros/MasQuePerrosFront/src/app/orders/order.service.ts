import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './models/order';
import { Observable } from 'rxjs';
import config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private urlEndPoint: string = config.url + 'orders';

  constructor(private http: HttpClient) { }

  getOrder(id:number): Observable<Order> {
    return this.http.get<Order>(`${this.urlEndPoint}/${id}`);
  }
}
