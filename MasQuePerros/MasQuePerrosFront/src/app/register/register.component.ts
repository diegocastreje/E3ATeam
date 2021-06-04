import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { User } from '../users/user';
import { AuthService } from '../users/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { PaymentMethod } from '../users/payment-method';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public comprobarContra:String="";
  public user:User ;
  public paymentMethods :PaymentMethod[]=[];
  constructor(

    private authService: AuthService,
    private router: Router,
    public userService : UserService,) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated() && this.authService.user != undefined) {
      swal.fire(
        'Login',
        `Hi ${this.authService.user.username} you're already signed in!`,
        'info'
      );

      this.router.navigate(['/users']);
    }
    this.userService.getPayments().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    });
    console.log(this.paymentMethods);
  }

  public create():void{
    if(this.calculateAge()>18){
    if(this.user.password==this.comprobarContra && this.comprobarRegistro()){
      console.log(this.user)
      this.userService.createUserClient(this.user).subscribe(
        reponse => this.router.navigate(['/login'])
      )
    }else{
      swal.fire('Error con las contraseñas: ',
      'Ambas contraseñas deben coincidir',
      'error');
    }
  }else{
    swal.fire('Error con las edad: ',
    'Debe de ser mayor de edad para poder comprar',
    'error');
  }
  }
  login(): void {
    if (this.user.username == '' || this.user.password == '') {
      swal.fire('Error login', 'Empty email or password', 'error');

      return;
    }

    this.authService.login(this.user).subscribe(
      (response) => {
        this.authService.saveUser(response.access_token);

        this.authService.saveToken(response.access_token);

        let user = this.authService.user;

        this.router.navigate(['/users']);

        if (user != null) {
          swal.fire('Login', `Hi ${user.username}, you've signed in!`, 'success');
        }
      },
      (error) => {
        if (error.status == 400) {
          swal.fire('Error login', 'Wrong email or password', 'error');
        }
      }
    );
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

  calculateAge():number{
    var parts =this.user.birth_date.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    const timeDiff = Math.abs(Date.now() - mydate.getTime());
    console.log(Math.floor((timeDiff / (1000 * 3600 * 24))/365))
    return Math.floor((timeDiff / (1000 * 3600 * 24))/365);

  }
}
