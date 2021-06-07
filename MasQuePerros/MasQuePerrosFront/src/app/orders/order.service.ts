import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../assets/config/config.json';
import { User } from '../users/user';
import { Order } from './models/order';
import { OrderItem } from './models/order-item';
import { Item } from '../items/item';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../users/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private urlEndPoint: string = config.url + 'orders';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getOrder(): Order {
    return JSON.parse(sessionStorage.getItem('shoppingList') || '{}');
  }

  private setOrder(order: Order): void {
    sessionStorage.setItem('shoppingList', JSON.stringify(order));
  }
  private setOrderPrice(order: Order) {
    order.price = 0;
    order.items.forEach((item) => (order.price += item.price));
  }

  getTotalPrice(): number {
    return this.getOrder().price;
  }

  getUserData(): User {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }

  addToCart(addItem: Item, quantity: number) {
    var shoppingList: Order = this.getOrder();

    var orderItem = shoppingList.items.find(
      (ordItems) => addItem.item_id == ordItems.item.item_id
    );

    if (orderItem == undefined) {
      orderItem = new OrderItem();

      orderItem.item = addItem;
      orderItem.amount = quantity;
      orderItem.price = addItem.price * quantity;

      shoppingList.items.push(orderItem);
    } else {
      orderItem.amount += quantity;
      orderItem.price = orderItem.amount * addItem.price;
    }

    this.setOrderPrice(shoppingList);

    this.setOrder(shoppingList);
  }

  removeFromCart(orderItem: OrderItem) {
    var shoppingList: Order = this.getOrder();

    shoppingList.items.splice(
      shoppingList.items.findIndex(
        (oItem) => oItem.item.item_id == orderItem.item.item_id
      ),
      1
    );
    this.setOrderPrice(shoppingList);

    this.setOrder(shoppingList);
  }

  cleanCart() {
    this.auth.saveShoppingList(this.auth.getUserData());
  }

  sendOrder(): Observable<Order> {
    var shoppingList = this.getOrder();

    return this.http.post<any>(this.urlEndPoint, shoppingList).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }
        
        if(e.error.message){

          console.error(e.error.message);

        }
        return throwError(e);
      })
    );
  }
}
