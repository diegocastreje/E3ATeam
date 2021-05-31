import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Role } from './role';
import { PaymentMethod } from './payment-method';
import { UserService } from './user.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  public selectedCountriesControl = new FormControl();
  public title: string = "Create user";
  public user:User =new User();
  public paymentMethods :PaymentMethod[]=[];
  public roles :Role[]=[];

  constructor(public userService : UserService,
  public router:Router,
  public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.userService.getPayments().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    });
    this.userService.getRoles().subscribe(roles => {
      this.roles = roles;
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

//    var roles:Role[]=[];
//    roles[0]=this.user.role;
    this.user.role=  [this.user.role];
    this.userService.create(this.user).subscribe(
      reponse => this.router.navigate(['/users'])

    )
  }

  update():void{
//    var roles:Role[]=[this.user.role];
//    roles[0]=this.user.role;
    this.user.role= [this.user.role];
    this.userService.update(this.user).subscribe(user => {
      this.router.navigate(['/users'])
        Swal.fire('Usuario actualizado',`Usuario ${user.username} actualizado con exito`, 'success')
    });
  }

  comparePayment(o1:any, o2:any):boolean {
    if(typeof o2== "object" && o2!=null && o2!=undefined ){
      if(o1 === 2 && o2.payment_id === 2){
        return true
      }
      if(typeof o1== "object" && o1!=null && o1!=undefined ){
          return o1 === null || o2 ===null || o1 === undefined || o2 ===undefined? false: o1.description==o2.description;
      }
    }
    return false;
  }

  compareRole(){

  }
}
