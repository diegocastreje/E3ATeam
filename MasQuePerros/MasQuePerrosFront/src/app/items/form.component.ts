import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item';
import { ItemService } from './item.service';
import { ItemsComponent } from './items.component';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input()
  item!: Item;

  selectedImg: File | null = null;

  progress: number = 0;
  errores: string[] = [];

  constructor(
    private itemService: ItemService,
    public modalService: ModalService,
    public itemsComponent: ItemsComponent
  ) {}

  selectImage(files: any): void {
    this.selectedImg = files[0];
    this.progress = 0;

    if (
      this.selectedImg != null &&
      this.selectedImg.type.indexOf('image') < 0
    ) {
      swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser del tipo imagen',
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
            this.modalService.notificarUpload.emit(this.item);
            swal.fire(
              'La foto se ha subido completamente',
              response.mensaje.split('_')[1] /*`${this.item.picture}`*/,
              'success'
            );
            this.modalService.notificarUpload.emit(this.item);
            this.itemService
              .getItem(this.item.item_id)
              .subscribe((data: Item) => {
                this.itemsComponent.loadImageItem(data);
              });
          }
        });
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.progress = 0;
  }

  delete(item: Item): void {
    this.itemsComponent.delete(item, true);
    this.selectedImg = null;
    this.progress = 0;
  }

  public update(): void {
    this.itemService.update(this.item).subscribe(
      (item) => {
        swal.fire(
          'Item actualizado',
          `Item ${item.name} actualizado con éxito`,
          'success'
        );
        this.closeModal();
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        this.modalService.notificarUpload.emit(this.item);
      }
    );
  }

  // @Input() item: Item;
  //
  // selectedImg: File;
  //
  // constructor(private itemService: ItemService, private activatedRoute: ActivatedRoute) { }
  //
  // ngOnInit(): void {
  //   this.cargarCliente();
  // }
  //
  // private cargarCliente(): void{
  //   this.activatedRoute.params.subscribe(params => {
  //     let id = +params.get('id');
  //     if(id){
  //       this.itemService.getItem(id).subscribe( (item) => this.item = item);
  //     }
  //   });
  // }
  //
  // selectImage(event){
  //   this.selectedImg = event.target.files[0];
  //   console.log(this.selectedImg);
  //   if(this.selectedImg.type.indexOf('image') < 0){
  //     swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
  //     this.selectedImg = null;
  //   }
  // }
  //
  // seleccionarFoto(event){
  //   this.selectedImg = event.target.files[0];
  //   console.log(this.selectedImg);
  // }
  //
  // uploadImage(){
  //
  //   if(!this.selectedImg){
  //     swal.fire('Error Upload: ', 'Debe de seleccionar una foto', 'error');
  //   }else {
  //     this.itemService.uploadImg(this.selectedImg, this.item.id)
  //     .subscribe(item/*event*/ => {
  //       // if(event.type === HttpEventType.UploadProgress){
  //       //   this.progress = Math.round((event.loaded / event.total) * 100);
  //       // }else if(event.type === HttpEventType.Response){
  //       //   let response: any = event.body;
  //       //   this.item = response.item as Item;
  //       //   this.modalService.notificarUpload.emit(this.item);
  //
  //       //}
  //         swal.fire('La foto se ha subido completamente', `${this.item.picture}`/*response.mensaje*/, 'success');
  //       //  this.cliente = cliente;
  //
  //       });
  //   }
  // }
}
