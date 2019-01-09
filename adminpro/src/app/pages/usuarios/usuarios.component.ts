import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

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
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuario();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarUsuario() );

  }


  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
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

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal( 'No puede borrar usuario', 'No se puede borrar a si mismo', 'error' );
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if ( borrar ) {
          this._usuarioService.borrarUsuario( usuario._id )
          .subscribe( resp => {
            this.cargarUsuario();
          });
      }
    });

  }

  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
    .subscribe();
    this.cargarUsuario();
  }

}
