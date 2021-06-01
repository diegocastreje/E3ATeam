import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { User } from '../users/user';
import { AuthService } from '../users/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService, private router: Router) {
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
          swal.fire('Login', `Hi ${user.email}, you've signed in!`, 'success');
        }
      },
      (error) => {
        if (error.status == 400) {
          swal.fire('Error login', 'Wrong email or password', 'error');
        }
      }
    );
  }
}
