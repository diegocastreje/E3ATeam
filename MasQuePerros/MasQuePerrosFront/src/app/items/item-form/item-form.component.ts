import { Component, OnInit} from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  public title: string = this.translate.instant('CreateItemTitle');

  public titleUpdate: string = this.translate.instant('UpdateItemTitle');

  public cargado:Boolean=false;

  public item:Item =new Item();

  selectedImg: File | null = null;

  progress: number = 0;
  errores: string[] = [];

  constructor(
    private itemService: ItemService,
    public router:Router,
    public activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.cargarItem();
  }

  cargarItem():void{
    this.activatedRoute.params.subscribe(params =>{
      let item_id = params['id']
      if(item_id){
        this.cargado=true;
        this.itemService.getItem(item_id)
        .subscribe((item) => this.item = item)

      }
    })

  }

  selectImage(files: any): void {
    this.selectedImg = files[0];
    this.progress = 0;

    if (
      this.selectedImg != null &&
      this.selectedImg.type.indexOf('image') < 0
    ) {
      swal.fire(
        this.translate.instant('SwalSelectPictureError'),
        this.translate.instant('SwalSelectPictureErrorAdvice'),
        'error'
      );
      this.selectedImg = null;
    }

    if (this.selectedImg != null) {
      document
        .getElementById('imgProductDetail')
        ?.setAttribute('src', this.selectedImg.name);
      this.itemService
        .uploadImg(this.selectedImg, this.item.item_id)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total!) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;

            this.item = response.item as Item;
            swal.fire(
              this.translate.instant('SwalCreateItemAdvice'),
              this.translate.instant('SwalThePicture') + this.item.picture + this.translate.instant('SwalCreateItemPictureUploaded'),
              'success'
            );
            this.itemService
              .getItem(this.item.item_id)
              .subscribe((data: Item) => {
                //this.itemService.loadImageItem(data);
              });
          }
        });
    }
  }

  public create(): void {
    this.itemService.create(this.item).subscribe(
      (item) => {
        swal.fire(
          this.translate.instant('SwalCreateItemAdvice'),
          this.translate.instant('SwalTheItem') + this.item.name + this.translate.instant('SwalCreateItemSuccess'),
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.router.navigate(['/items']);
  }

  public update(): void {
    this.itemService.update(this.item).subscribe(
      (item) => {
        swal.fire(
          this.translate.instant('SwalUpdateItemAdvice'),
          this.translate.instant('SwalTheItem') + item.name +  this.translate.instant('SwalUpdateItemSuccess'),
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
    this.router.navigate(['/items']);
  }

}
