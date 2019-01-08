import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string;

  public notificacion = new EventEmitter<any>();

  constructor() { }

   ocultarModal() {

   }

   mostrarModal() {

   }
}
