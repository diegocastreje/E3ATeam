import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './users/user.component';
import { FormComponent } from './users/form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { ItemService } from './items/item.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './users/guards/auth.guard';
import { RoleGuard } from './users/guards/role.guard';
import { TokenInterceptor } from './users/interceptors/token.interceptor';
import { AuthInterceptor } from './users/interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderEndComponent } from './orders/order-end/order-end.component';
import { ItemFormComponent } from './items/item-form/item-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'items', component: ItemsComponent },
  {
    path: 'items/form',
     component: ItemFormComponent,
      canActivate: [AuthGuard, RoleGuard],
       data: { role: ['ROLE_ADMIN', 'ROLE_CLERK']}
     },
  {
    path: 'items/form/:id',
     component: ItemFormComponent,
      canActivate: [AuthGuard, RoleGuard],
       data: { role: ['ROLE_ADMIN', 'ROLE_CLERK']}
     },
  { path: 'users', component: UserComponent },
  {
    path: 'users/form',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'users/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_CLIENT' },
  },
  {
    path: 'orders/thankyou',
    component: OrderEndComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_CLIENT' },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ItemsComponent,
    UserComponent,
    FormComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    OrderEndComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ItemService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
