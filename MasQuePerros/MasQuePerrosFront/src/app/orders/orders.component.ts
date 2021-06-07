import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../users/user';
import { Order } from './models/order';
import { OrderItem } from './models/order-item';
import { OrderService } from './order.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  items: Order = new Order();

  public user: User = new User();

  constructor(private orderService: OrderService, public router: Router, private translate: TranslateService) {
    this.items = orderService.getOrder();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  getPrecioTotal(): number {
    return this.orderService.getTotalPrice();
  }

  loadUserData(): void {
    this.user = this.orderService.getUserData();
  }

  pay(): void {
    if (this.items.items.length > 0) {
      this.orderService.sendOrder().subscribe((reponse: any) => {
        this.router.navigate(['/orders/thankyou'], {
          queryParams: { id: reponse.Order.order_id },
        });
      });
      this.orderService.cleanCart();
      this.items = this.orderService.getOrder();
    } else {
      swal.fire(this.translate.instant('SwalError'), this.translate.instant('SwalNoItemShoppingCart'), 'error');
    }
  }

  delete(orderItem: OrderItem): void {
    this.orderService.removeFromCart(orderItem);
    this.items = this.orderService.getOrder();
  }
}
