import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) {
    console.log('Servicio de usuario listo');
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {

  }

  loginGoogle( token: string ) {
    const url = URL_SERVICIOS + '/login/google';
  
    return this.http.post( url, {token} );

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
      console.log("resp", resp);
      localStorage.setItem('id', resp.usuario._id);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));

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
}
