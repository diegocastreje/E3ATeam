import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { User } from '../users/user';

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

  constructor() { 
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




  }

}
