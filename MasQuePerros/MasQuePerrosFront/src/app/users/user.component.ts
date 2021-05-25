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

  fNombre: string = '';
  fPrimer: string = '';
  fSegundo: string = '';
  fPerfil: string = '';
  usuariosFiltrados: User[] = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userService.getUsuarios().subscribe((response) => {
        this.users = response;
        this.usuariosFiltrados = response;
      });
    });
  }

  aplicarFiltro(event: any) {
    switch (event.originalTarget.name) {
      case 'fNombre':
        this.fNombre = event.originalTarget.value;
        break;
      case 'fPrimer':
        this.fPrimer = event.originalTarget.value;
        break;
      case 'fSegundo':
        this.fSegundo = event.originalTarget.value;
        break;
      case 'fPerfil':
        this.fPerfil = event.originalTarget.value;
    }

    this.usuariosFiltrados = this.filtrar();
  }

  filtrar(): User[] {
    return this.users.filter((usuario: User) => {
      var filtrar = true;
      if (this.fNombre) {
        filtrar =
          usuario.first_name
            .toLocaleLowerCase()
            .indexOf(this.fNombre.toLocaleLowerCase()) !== -1;
      }

      if (this.fPrimer && filtrar) {
        filtrar =
          usuario.middle_name
            .toLocaleLowerCase()
            .indexOf(this.fPrimer.toLocaleLowerCase()) !== -1;
      }

      if (this.fSegundo && filtrar) {
        filtrar =
          usuario.last_name
            .toLocaleLowerCase()
            .indexOf(this.fSegundo.toLocaleLowerCase()) !== -1;
      }

      if (this.fPerfil && filtrar) {
        filtrar =
          usuario.role.name
            .toLocaleLowerCase()
            .indexOf(this.fPerfil.toLocaleLowerCase()) !== -1;
      }
      return filtrar;
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
      return function (a: any, b: any) {
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

  borrar(user: User) {
    /*
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: '¡No podrás recuperarlo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borralo',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {*/
          this.userService.delete(user).subscribe((response) => {
            this.usuariosFiltrados = this.usuariosFiltrados.filter((usr) => usr !== user);
            this.users = this.users.filter((usr) => usr !== user);
/*
            swalWithBootstrapButtons.fire(
              'Borrado',
              `El cliente ${cliente.nombre} ${cliente.apellido} ha sido borrado`,
              'success'
            );*/
          });
        /*}
      });*/
  }
}