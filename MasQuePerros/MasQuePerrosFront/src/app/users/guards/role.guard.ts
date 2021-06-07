import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);

      return false;
    }

    let role = next.data['role'];

    if(Array.isArray(role)){
      role = next.data['role'];
      for (var i:number = 0; i < role.length; i++){
        if (this.authService.hasRole(role[i])) {
          return true;
        }
      }
    }

    console.log(next.data);

    console.log(role);

    if (this.authService.hasRole(role)) {
      return true;
    }
    if (this.authService.user != undefined) {
      swal.fire(
        this.translate.instant('AccessDenied'),
        this.translate.instant('SwalSalute') + this.authService.user.username + this.translate.instant('Swal403'),
        'warning'
      );
    }

    this.router.navigate(['/items']);

    return false;
  }
}
