import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Role } from './role';
import { PaymentMethod } from './payment-method';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private title: string = "Create user";

  constructor(public userService : UserService,
  public router:Router) { }

  ngOnInit(): void {
  }

  public create():void{
    this.userService.create(this.user).subscribe(
      reponse => this.router.navigate(['/users'])
    )
  }
}
