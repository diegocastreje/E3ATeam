import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './users/user.component';
import { FormComponent } from './users/form.component';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { ItemService } from './items/item.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './users/guards/auth.guard';
import { RoleGuard } from './users/guards/role.guard';
import { TokenInterceptor } from './users/interceptors/token.interceptor';
import { AuthInterceptor } from './users/interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';




const routes: Routes = [
  {path: '', redirectTo: '/items', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'items/:id', component: FormComponent},
  {path: 'users', component: UserComponent},
  {path: 'users/form', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'users/form/:id', component:FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}}
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ItemService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
