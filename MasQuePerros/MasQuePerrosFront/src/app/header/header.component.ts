import { Component } from '@angular/core';
import { AuthService } from '../users/auth.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })

  export class HeaderComponent {
    title: string = 'Más Que Perros™';

    constructor(private authService:AuthService, private router: Router) { }

    logout():void {

      let username = this.authService.user.username;

      this.authService.logout();

      swal.fire('Logout', `Hi ${username}, you've logged out!`, 'success');

      this.router.navigate(['/login']);

    }

  }
