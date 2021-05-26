import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = "Más Que Perros";
  symbol: string = 'TM';
  text1: string = "En esta tienda encontrarás todos los productos para tu mascota.";
  text2: string = "Especialistas en alimentación para perros";

  constructor() { }

  ngOnInit(): void {
  }

}
