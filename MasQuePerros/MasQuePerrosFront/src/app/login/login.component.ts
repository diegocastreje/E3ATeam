import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { User } from '../users/user';
import {AuthService} from '../users/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Más Que Perros™";
  user: User;
  symbol: string = 'TM';
  text1: string = "En esta tienda encontrarás todos los productos para tu mascota.";
  text2: string = "Especialistas en alimentación para perros";

  constructor(private authService: AuthService, private router: Router) { 
    this.user= new User();
  }

  ngOnInit(): void {
  }

  login():void  {
    console.log(this.user);
    if (this.user.email == null || this.user.password == null) {
      swal.fire('Error login','Empty email or password','error');
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log(response);
      let Payload = JSON.parse(atob(response.access_token.split(".")[1]));
      console.log(Payload);
      this.router.navigate(['/users']);
      swal.fire('Login', `Hi ${Payload.email}, you've signed in!`, 'success');
    });
  }

}
