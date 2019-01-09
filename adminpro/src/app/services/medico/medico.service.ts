import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  token: string = '';

  constructor(
    public http: HttpClient,
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico';

    return this.http.get( url );
  }

  buscarMedicos( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url )
    .pipe( map( (resp: any) => resp.medicos ));
  }

  borrarMedico( id: string ) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.token;
    return this.http.delete(url)
    .pipe(map (resp => {
      return true;
    }));
  }


}
