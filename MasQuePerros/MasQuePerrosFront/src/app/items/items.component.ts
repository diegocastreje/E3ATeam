import { Component, OnInit } from '@angular/core';
import{ Item } from './item';
import { ItemService } from './item.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private itemService: ItemService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');

      if(!page)
        page = 0;

      this.clienteService.getClientes(page)
      .pipe(
        tap(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        })
      ).subscribe();
    });

}
