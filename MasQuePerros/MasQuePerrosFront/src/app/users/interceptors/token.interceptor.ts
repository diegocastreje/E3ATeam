import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.authService.token;
    if (token != undefined) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

      console.log('TokenInterceptor = > Bearer ' + token);

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
