import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  @ViewChild('video')
    public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  mostrarCamara: boolean = false;
  mostrarFoto: boolean = false;
  localStream: any;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  seleccionImagen( archivo ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
console.log(archivo);
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp => {

      this._modalUploadService.notificacion.emit( resp );
      this.cerrarModal();

    })
    .catch( err => {
      console.log('Error en la carga...', err);
    });

  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.mostrarCamara = false;
    this.mostrarFoto = false;

    if ( this.localStream ) {

      if (this.localStream.stop) {
        this.localStream.stop(); // idk what this does, left here for legacy reasons..?
      } else {
        this.localStream.getTracks().forEach(function(track) { track.stop(); } );
      }
    }

    this._modalUploadService.ocultarModal();
  }

  mostrarOcultarCamara ( ) {
    this.mostrarCamara = !this.mostrarCamara;
  }

  inicializarCamara ( ) {
    this.mostrarCamara = true;
    this.mostrarFoto = false;
    this.imagenTemp = null;
      if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
            this.localStream = stream;
        });
    }
  }

  capturar() {

    setTimeout(() => {

      this.mostrarFoto = true;
      this.imagenTemp = this.canvas.nativeElement.toDataURL('image/png');

      this.urltoFile(this.imagenTemp, 'foto.png', 'image/png')
      .then((file) => {
        console.log(file);
        this.imagenSubir = file;
      });

      console.log(this.imagenTemp);
    }, 100);
    console.log('this.video.nativeElement', this.video);
    // tslint:disable-next-line:max-line-length
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
    this.video.nativeElement.srcObject = null;
    this.video.nativeElement.pause();


    if (this.localStream.stop) {
      this.localStream.stop(); // idk what this does, left here for legacy reasons..?
    } else {
      this.localStream.getTracks().forEach(function(track) { track.stop(); } );
    }

  }

  // return a promise that resolves with a File instance
     urltoFile(url, filename, mimeType): Promise<File> {
    return (fetch(url)
        .then( function(res) { return res.arrayBuffer(); } )
        .then( function(buf) { return new File([buf], filename, {type: mimeType}); } )
    );
  }

}
