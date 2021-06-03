import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from './item';
import { ItemService } from './item.service';
import swal from 'sweetalert2';
import { AuthService } from '../users/auth.service';

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
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.itemService.getItems().subscribe((response) => {
        this.items = response;
        this.filteredItems = response;
      });
    });
  }

  private changeImage(item: Item, i: Item) {
    if (item.item_id == i.item_id) {
      i.picture = item.picture;
    }
    return i;
  }

  loadImageItem(item: Item) {
    this.items = this.items.map(i =>  this.changeImage(item, i));

    this.filteredItems = this.filteredItems.map(i => this.changeImage(item, i));
  }

  applyFilter(event: any) {
    console.log(event)
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
      // Return the required a,b function
      return function (a: any, b: any) {
        // Reset a, b to the field
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

}
