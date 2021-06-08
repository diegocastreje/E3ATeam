import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { User } from '../users/user';
import { AuthService } from '../users/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { PaymentMethod } from '../users/payment-method';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public comprobarContra: string = '';
  public user: User;
  public paymentMethods: PaymentMethod[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    public userService: UserService,
    public translate: TranslateService
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (
      this.authService.isAuthenticated() &&
      this.authService.user != undefined
    ) {
      swal.fire(
        this.translate.instant('SwalAlreadySignedinAdvice'),
        this.translate.instant('SwalAttention') +
          this.authService.user.username +
          this.translate.instant('SwalAlreadySignedinFail'),
        'info'
      );

      this.router.navigate(['/users']);
    }
    this.userService.getPayments().subscribe((paymentMethods) => {
      this.paymentMethods = paymentMethods;
    });
  }

  public create(): void {
    if (this.calculateAge() > 18) {
      if (
        this.user.password == this.comprobarContra &&
        this.comprobarRegistro()
      ) {
        this.userService
          .createUserClient(this.user)
          .subscribe((reponse) => this.router.navigate(['/login']));
        swal.fire(
          this.translate.instant('SwalRegisterAdvice'),
          this.translate.instant('SwalRegisterCongrats') +
            this.user.first_name +
            this.translate.instant('SwalRegisterSuccess'),
          'success'
        );
      } else {
        swal.fire(
          this.translate.instant('SwalRegisterErrorAdvice'),
          this.translate.instant('SwalRegisterErrorWrong'),
          'error'
        );
      }
    }else{
      swal.fire(this.translate.instant('SwalRegisterBirthDateErrorAdvice'),
      this.translate.instant('SwalRegisterBirthDateErrorWrong'),
      'error');
    }
  }
  login(): void {
    if (this.user.username == '' || this.user.password == '') {
      swal.fire(
        this.translate.instant('SwalLoginErrorAdvice'),
        this.translate.instant('SwalLoginErrorEmpty'),
        'error'
      );

      return;
    }

    this.authService.login(this.user).subscribe(
      (response) => {
        this.authService.saveUser(response.access_token);

        this.authService.saveToken(response.access_token);

        let user = this.authService.user;

        this.router.navigate(['/users']);

        if (user != null) {
          swal.fire(
            this.translate.instant('SwalLoginAdvice') +
              this.translate.instant('SwalSalute') +
              user.first_name +
              this.translate.instant('SwalLoginSuccess'),
            'success'
          );
        }
      },
      (error) => {
        if (error.status == 400) {
          swal.fire(
            this.translate.instant('SwalLoginErrorAdvice'),
            this.translate.instant('SwalLoginErrorWrong'),
            'error'
          );
        }
      }
    );
  }
  comprobarRegistro(): boolean {
    var reLargo =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      reLargo.test(this.user.email) &&
      this.user.username.trim().length >= 2 &&
      this.user.first_name.trim().length >= 2 &&
      this.user.middle_name.trim().length >= 2 &&
      this.user.last_name.trim().length >= 2 &&
      this.user.password.trim().length >= 2 &&
      this.user.username == this.user.username.replace(' ', '') &&
      this.user.first_name == this.user.first_name.replace(' ', '') &&
      this.user.middle_name == this.user.middle_name.replace(' ', '') &&
      this.user.last_name == this.user.last_name.replace(' ', '')
    ) {
      return true;
    }
    return false;
  }

  calculateAge(): number {
    var parts = this.user.birth_date.split('-');
    var mydate = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    const timeDiff = Math.abs(Date.now() - mydate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
  }

  togglePassword(id: number): void {
    var element: HTMLInputElement;
    var button;

    if (id === 1) {
      element = document.getElementsByName('password')[0] as HTMLInputElement;
      button = document.getElementById('eye-1');
    } else {
      element = document.getElementsByName(
        'comprobarContra'
      )[0] as HTMLInputElement;
      button = document.getElementById('eye-2');
    }

    if (element.type === 'password') {
      element.type = 'text';
      button?.setAttribute('class', 'bi-eye');
    } else {
      element.type = 'password';
      button?.setAttribute('class', 'bi-eye-slash');
    }
  }
}
