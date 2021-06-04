import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/users/auth.service';

@Component({
  selector: 'app-order-end',
  templateUrl: './order-end.component.html',
  styleUrls: ['./order-end.component.css'],
})
export class OrderEndComponent {
  orderId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    activatedRoute.queryParams.subscribe((params) => {
      this.orderId = params['id'];
    });
  }

  continue() {
    this.router.navigate(['/items']);
  }
}
