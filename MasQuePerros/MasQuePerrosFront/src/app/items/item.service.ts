import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from './item';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private urlEndPoint: string = 'http://localhost:8081/api/items';

  constructor(private http: HttpClient, private router: Router) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.urlEndPoint);
  }

  getItem(id: number): Observable<Item>{
  return this.http.get<Item>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
      this.router.navigate(['/items/' +id ]);
      console.error(e.error.mensaje);
      swal.fire('Error al recuperar el cliente', e.error.mensaje, 'error');
      return throwError(e);
    })
  );
}
}
