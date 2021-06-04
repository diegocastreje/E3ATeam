import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from './item';
import { ItemService } from './item.service';
import swal from 'sweetalert2';
import { AuthService } from '../users/auth.service';
import { OrderService } from '../orders/order.service';
import { Order } from '../orders/models/order';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];

  column: string = '';
  orderType: string = '';

  fName: string = '';
  fAmount: number = 0;
  fDescription: string = '';
  //fPicture: string = '';
  fPicture: string = '';
  filteredItems: Item[] = [];

  constructor(
    private itemService: ItemService,
    private orderService: OrderService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.itemService.getItems().subscribe((response) => {
        this.items = response;
        this.filteredItems = response;

        var shoppingList = this.orderService.getOrder();

        this.items = this.items.filter(item => this.filterEmptyItems(shoppingList, item));
        this.filteredItems = this.filteredItems.filter(item => this.filterEmptyItems(shoppingList, item));
        //comprobar en la lista las cantidades
      });
    });
  }

  private filterEmptyItems(shoppingList: Order, item: Item){
    this.compareQuantities(shoppingList, item);

    return item.amount > 0;
  }

  private compareQuantities(shoppingList: Order, item: Item) {
    shoppingList.items.forEach(itemList => {
      if (item.item_id == itemList.item.item_id){
        item.amount -= itemList.item.amount;
      }
    });
  }

  private changeImage(item: Item, i: Item) {
    if (item.item_id == i.item_id) {
      i.picture = item.picture;
    }
    return i;
  }

  loadImageItem(item: Item) {
    this.items = this.items.map((i) => this.changeImage(item, i));

    this.filteredItems = this.filteredItems.map((i) =>
      this.changeImage(item, i)
    );
  }

  applyFilter(event: any) {
    switch (event.srcElement.name) {
      case 'fName':
        this.fName = event.srcElement.value;
        break;
      case 'fAmount':
        this.fAmount = event.srcElement.value;
        break;
      case 'fDescription':
        this.fDescription = event.srcElement.value;
        break;
      case 'fPicture':
        this.fPicture = event.srcElement.value;
    }

    this.filteredItems = this.filter();
  }

  filter(): Item[] {
    return this.items.filter((item: Item) => {
      var filter = true;
      if (this.fName) {
        filter =
          item.name
            .toLocaleLowerCase()
            .indexOf(this.fName.toLocaleLowerCase()) !== -1;
      }

      if (this.fDescription && filter) {
        filter =
          item.description
            .toLocaleLowerCase()
            .indexOf(this.fDescription.toLocaleLowerCase()) !== -1;
      }

      if (this.fPicture && filter) {
        filter =
          item.picture
            .toLocaleLowerCase()
            .indexOf(this.fPicture.toLocaleLowerCase()) !== -1;
      }
      return filter;
    });
  }

  changeOrder(column: string) {
    if (column) {
      if (this.column === column) {
        this.orderType = this.orderType === 'asc' ? 'desc' : 'asc';
      }

      this.column = column;

      this.order(this.items, this.column, this.orderType);
    }
  }

  orderAsc(column: string) {
    return this.column == column && this.orderType == 'asc';
  }

  orderDesc(column: string) {
    return this.column == column && this.orderType == 'desc';
  }

  private order(items: Array<any>, column: string, order: string) {
    var sortFunc = function (field: string, desc: boolean) {
      return function (a: any, b: any) {
        var ca = a[column];
        var cb = b[column];
        var res = 0;

        if (typeof ca === 'number') {
          res = ca > cb ? -1 : 1;
        } else {
          res = ca.localeCompare(cb);
        }

        return res * (desc ? -1 : 1);
      };
    };

    items.sort(sortFunc(column, order === 'desc'));
  }

  delete(item: Item): void {
    swal
      .fire({
        title: 'Eliminar Item',
        text: `¿Seguro que quieres eliminar el item ${item.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.itemService.delete(item.item_id).subscribe((response) => {
            this.items = this.items.filter((ite) => ite !== item);
            this.filteredItems = this.filteredItems.filter(
              (itm) => itm !== item
            );
            swal.fire('Eliminado!', 'El item ha sido eliminado.', 'success');
          });
        }
      });
  }

  addToCart(addItem: Item): void {
    this.orderService.addToCart(addItem);
    addItem.amount--; //pendiente de cambiar en la lista de items
  }
}
