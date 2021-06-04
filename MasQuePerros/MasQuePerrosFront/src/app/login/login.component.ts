import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { User } from '../users/user';
import { AuthService } from '../users/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {
    this.user = new User();

  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated() && this.authService.user != undefined) {
      swal.fire(
        this.translate.instant('SwalAlreadySignedinAdvice'),
        this.translate.instant('SwalAttention') + this.authService.user.first_name + this.translate.instant('SwalAlreadySignedinFail'),
        'info'
      );

      this.router.navigate(['/items']);
    }

  }
  

  login(): void {
    if (this.user.username == '' || this.user.password == '') {
      swal.fire(this.translate.instant('SwalLoginErrorAdvice'), this.translate.instant('SwalLoginErrorEmpty'), 'error');

      return;
    }
    
    this.authService.login(this.user).subscribe(
      (response) => {
        this.authService.saveUser(response.access_token);

        this.authService.saveToken(response.access_token);
        
        var user = this.authService.user;

        this.authService.saveShoppingList(user || new User());

        this.router.navigate(['/items']);

        if (user != null) {
          swal.fire(this.translate.instant('SwalLoginAdvice'), this.translate.instant('SwalSalute') + user.first_name + this.translate.instant('SwalLoginSuccess'), 'success');
        }
      },
      (error) => {
        if (error.status == 400) {
          swal.fire(this.translate.instant('SwalLoginErrorAdvice'), this.translate.instant('SwalLoginErrorWrong'), 'error');
        }
      }
    );
  }
}
