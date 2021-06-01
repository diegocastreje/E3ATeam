import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Item } from './item';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  urlEndPoint: string = 'http://localhost:8080/api/items';
  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

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

  uploadImg(file: File, id: any): Observable<HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

  delete(id: number): Observable<Item>{
    return this.http.delete<Item>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  update(item: Item): Observable<Item>{
    return this.http.put<Item>(`${this.urlEndPoint}/${item.item_id}`, item, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.item as Item),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
