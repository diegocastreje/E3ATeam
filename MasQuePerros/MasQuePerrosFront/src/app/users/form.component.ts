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

  user:User =new User();
  role:Role = new Role();

  pay:PaymentMethod = new PaymentMethod();
  public title: string = "Create user";
  
  constructor(public userService : UserService,
  public router:Router) { }

  ngOnInit(): void {
  }

  public create():void{
    //Esto esta asi por las pruebas (al añadir el campo select en el formulario se recomienda hacerlo en el mismo orden)
    this.role.name="ROLE_CLIENT"
    this.role.role_id=1;
    console.log("Clicked");
    this.user.role=this.role;
    this.user.payment_method=this.pay;
    this.userService.create(this.user).subscribe(
      response => this.router.navigate(['/users'])
    )
  }
}
