import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Role } from './role';
import { PaymentMethod } from './payment-method';
import { UserService } from './user.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {

  public cargado:Boolean=false;
  public selectedCountriesControl = new FormControl();
  public title: string = "Create user";
  public user:User =new User();
  public paymentMethods :PaymentMethod[]=[];
  public roles :Role[]=[];

  constructor(public userService : UserService,
  public router:Router,
  public activatedRoute: ActivatedRoute,
  public translate: TranslateService) { }

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
        this.cargado=true;
        this.userService.getUsuario(user_id).pipe(
          map(user =>{
            user.birth_date=user.birth_date.substr(0,10);
            return user})
        )
        .subscribe((user) => this.user = user)

      }
    })

  }

  public create():void{

    this.user.role = [this.user.role];
    if(this.comprobarRegistro()){
      this.userService.create(this.user).subscribe(
        reponse => this.router.navigate(['/users'])
      )
    }else{
      Swal.fire(
        this.translate.instant('SwalCreateUserErrorAdvice'),
        this.translate.instant('SwalCreateUserErrorWrong'),
        "error"
      )
    }

  }

  update():void{
    if(!Array.isArray(this.user.role)){
      this.user.role= [this.user.role];
    }
    this.userService.update(this.user).subscribe(user => {
      this.router.navigate(['/users'])
        console.log(user)
        Swal.fire(this.translate.instant('SwalUpdateUserAdvice'), this.translate.instant('SwalTheUser') + this.user.username +  this.translate.instant('SwalUpdateUserSuccess'), 'success')
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

  compareRole(o1:any, o2:any):boolean{
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined? false: o1.role_id==o2[0].role_id;
  }
  comprobarRegistro():boolean{
    var reLargo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if(
      reLargo.test(this.user.email) &&
      this.user.username.trim().length>=2 &&
      this.user.first_name.trim().length>=2 &&
      this.user.middle_name.trim().length>=2 &&
      this.user.last_name.trim().length>=2 &&
      this.user.password.trim().length>=2 &&
      this.user.username==this.user.username.replace(" ","") &&
      this.user.first_name==this.user.first_name.replace(" ","") &&
      this.user.middle_name==this.user.middle_name.replace(" ","") &&
      this.user.last_name==this.user.last_name.replace(" ","")
      ){
        return true;
      }
    return false;
  }

}
