import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../models/usuario.model';

import { filter, map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  usuario: Usuario;
  token: string = '';

  constructor(
    public http: HttpClient,
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  cargarHospitales(desde: number = 0) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );

  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
    .pipe(map ( (resp: any) => resp.hospital ));
  }

  borrarHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete(url)
    .pipe(map (resp => {
      swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
      return true;
    }));
  }

  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;

    const hospital = new Hospital(nombre);

    return this.http.post(url, hospital)
    .pipe(map((res: any) => {
      swal('Hospital Creado', hospital.nombre, 'success');
      return res.hospital;
    }));
  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
    .pipe( map( (resp: any) => resp.hospital ));
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put( url, hospital)
    .pipe(map((res: any) => {
      swal( 'Hospital actualizado', hospital.nombre, 'success' );
      return true;
    }));
  }

}
