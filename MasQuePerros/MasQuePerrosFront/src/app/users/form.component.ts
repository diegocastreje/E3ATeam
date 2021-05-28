import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Role } from './role';
import { PaymentMethod } from './payment-method';
import { UserService } from './user.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  public title: string = "Create user";
  public user:User =new User()
  public paymentMethods :PaymentMethod[]=[];
  public roles :Role[]=[];

  constructor(public userService : UserService,
  public router:Router,
  public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.userService.getPayments().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
      console.log(paymentMethods);
    });
    this.userService.getRoles().subscribe(roles => {
      this.roles = roles;
      console.log(roles);
    });
  }

  cargarUsuario():void{
    this.activatedRoute.params.subscribe(params =>{
      let user_id = params['id']
      if(user_id){
        this.userService.getUsuario(user_id).subscribe((user) => this.user = user)
      }
    })
  }

  public create():void{
    console.log("1");
    console.log(this.user);
    this.userService.create(this.user).subscribe(
      reponse => this.router.navigate(['/users'])

    )
  }

  update():void{
    this.userService.update(this.user).subscribe(user => {
      this.router.navigate(['/users'])
        Swal.fire('Usuario actualizado',`Usuario ${user.username} actualizado con exito`, 'success')
    });
  }

  comparePayment(o1:PaymentMethod, o2:PaymentMethod):boolean {
    if(o1.payment_id === 2 && o2.payment_id === 2){
      return true
    }
    return o1 == null || o2 ==null? false: o1.payment_id===o2.payment_id;
  }

  compareRole(){

  }
}
