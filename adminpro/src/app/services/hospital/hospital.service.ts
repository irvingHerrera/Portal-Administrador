import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient
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

  }

  buscarHospital( termino: string ) {
    
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
