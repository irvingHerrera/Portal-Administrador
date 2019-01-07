import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistro = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {

    this.cargando = true;

    this._usuarioService.cargarUsuario( this.desde )
    .subscribe( (resp: any) => {
      this.totalRegistro = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;

    if ( desde >= this.totalRegistro) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuario();

  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuario();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuario( termino )
    .subscribe( (usuario: Usuario[]) => {
        this.usuarios = usuario;
        this.cargando = false;
    });
  }

}
