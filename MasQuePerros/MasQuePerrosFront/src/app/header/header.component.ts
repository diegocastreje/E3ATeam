import { Component } from '@angular/core';
import { AuthService } from '../users/auth.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })

  export class HeaderComponent {

    constructor(public authService:AuthService, private router: Router, private translate: TranslateService) { }

    logout():void {
      let first_name

      if (this.authService.user != undefined) {
         first_name = this.authService.user.first_name;

         
      }

      this.authService.logout();

      swal.fire(this.translate.instant('SwalLogoutAdvice'), this.translate.instant('SwalSUS') + first_name +  this.translate.instant('SwalLogoutSuccess'), 'success');

      this.router.navigate(['/login']);

    }

  }
