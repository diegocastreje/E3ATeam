import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ Item } from './item';
import { ItemService } from './item.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];

  column: string = '';
  orderType: string = '';

  fName: string = '';
  fAmount: number = 0;
  fDescription: string = '';
  fPicture: string = '';
  filteredItems: Item[] = [];

  constructor(private itemService: ItemService,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.itemService.getItems().subscribe((response) => {
        this.items = response;
        this.filteredItems = response;
      });
    });
  }



  applyFilter(event: any) {
    switch (event.originalTarget.name) {
      case 'fName':
        this.fName = event.originalTarget.value;
        break;
      case 'fAmount':
        this.fAmount = event.originalTarget.value;
        break;
      case 'fDescription':
        this.fDescription = event.originalTarget.value;
        break;
      case 'fPicture':
        this.fPicture = event.originalTarget.value;
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

        switch (column) {
          case 'name':
          case 'description':
          case 'picture':
            res = ca.localeCompare(cb);
            break;
          case 'role':
            res = ca.name > cb.name ? -1 : 1;
        }

        return res * (desc ? -1 : 1);
      };
    };

    items.sort(sortFunc(column, order === 'desc'));
  }
}
