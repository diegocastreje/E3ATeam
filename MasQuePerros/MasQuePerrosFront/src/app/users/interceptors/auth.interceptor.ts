import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private router: Router, private translate: TranslateService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e) => {
        if (e.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }

          this.router.navigate(['/login']);
        }

        if (e.status == 403) {
          if (this.authService.user != undefined) {
            swal.fire(
              this.translate.instant('AccesDenied'),
              this.translate.instant('SwalSalute') + this.authService.user.username + this.translate.instant('Swal403') ,
              'warning'
            );
          }

          this.router.navigate(['/users']);
        }

        return throwError(e);
      })
    );
  }
}
