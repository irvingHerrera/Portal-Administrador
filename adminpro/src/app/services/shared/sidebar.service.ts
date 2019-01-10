import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})


export class SidebarService {

  menu: any[] = [];

  /*menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {  titulo: 'Tablero', url: '/dashboard'},
        {  titulo: 'Barra de progreso', url: '/progress'},
        {  titulo: 'Gráficas', url: '/grafica1'},
        {  titulo: 'Promesas', url: '/promesas'},
        {  titulo: 'rxjs', url: '/rxjs'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {  titulo: 'Usuarios', url: '/usuarios'},
        {  titulo: 'Hospitales', url: '/hospitales'},
        {  titulo: 'Médicos', url: '/medicos'},
      ]
    }
  ];*/

  constructor(
    public _usuarioService: UsuarioService
  ) {
     this.menu = this._usuarioService.menu;
   }
}
