import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string = '';

  constructor(
    public http: HttpClient,
    public router: Router
    ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado() {
   return ( this.token.length > 5 ? true : false );
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';
  
    return this.http.post( url, {token} )
    .pipe(map( (resp: any) => {

      this.guardarStorage(resp.usuario._id, resp.token, resp.usuario);
      return true;
    }));

  }

  login(usuario: Usuario, recordar: boolean) {
    
    console.log("recordar", recordar);
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    
    return this.http.post(url, usuario)
    .pipe(map ( (resp: any) => {
      console.log('resp', resp);
      /*localStorage.setItem('id', resp.usuario._id);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));*/

      this.guardarStorage(resp.usuario._id, resp.token, resp.usuario);

      return true;
    }));
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
    .pipe(map((res: any) => {
      swal('Correo Creado', usuario.email, 'success');
      return res.usuario;
    }));
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario)
    .pipe(map((res: any) => {
      const usuarioDB: Usuario = res.usuario;
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB);

      swal( 'Usuario actualizado', usuario.nombre, 'success' );
      return true;
    }));
  }

}
