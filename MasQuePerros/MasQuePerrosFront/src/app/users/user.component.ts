import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  columna: string = '';
  tipoOrden: string = '';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userService.getUsuarios().subscribe((response) => {
        this.users = response;
      });
    });
  }

  cambioOrden(columna: string) {
    if (columna) {
      if (this.columna === columna) {
        this.tipoOrden = this.tipoOrden === 'asc' ? 'desc' : 'asc';
      }

      this.columna = columna;

      this.ordenar(this.users, this.columna, this.tipoOrden);
    }
  }

  ordenarAsc(columna: string) {
    return this.columna == columna && this.tipoOrden == 'asc';
  }

  ordenarDesc(columna: string) {
    return this.columna == columna && this.tipoOrden == 'desc';
  }

  private ordenar(usuarios: Array<any>, columna: string, orden: string) {
    var sortFunc = function (field: string, desc: boolean) {
      // Return the required a,b function
      return function (a: any, b: any) {
        // Reset a, b to the field
        var ca = a[columna];
        var cb = b[columna];
        var res = 0;

        switch (columna) {
          case 'first_name':
          case 'middle_name':
          case 'last_name':
            res = ca.localeCompare(cb);
            break;
          case 'role':
            res = ca.name > cb.name ? -1 : 1;
        }

        return res * (desc ? -1 : 1);
      };
    };

    usuarios.sort(sortFunc(columna, orden === 'desc'));
  }
}
