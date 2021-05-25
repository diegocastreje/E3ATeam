import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './users/user.component';
import { FormComponent } from './users/form.component';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './items/items.component';
import { ItemService } from './items/item.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/items', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'users', component: UserComponent},
  {path: 'clientes/form', component:FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ItemsComponent,
    UserComponent,
<<<<<<< HEAD
    FormComponent
=======
    LoginComponent
>>>>>>> 879ef3e0ea5d806c60eaca6b1e52bd785444452b
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]

})
export class AppModule {}
