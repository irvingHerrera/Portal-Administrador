import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { filter, map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';

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

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
    .pipe(map ((resp: any) => resp.medico));

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

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico/';

    if ( medico._id ) {

      url += '/' + medico._id;
      url += '?token=' + this.token;
      console.log('kedico', url);
      return this.http.put( url, medico )
      .pipe(map ( (resp: any) => {
        return resp.medico;
      }));

    } else {
      // crear medico
      url += '?token=' + this.token;
      return this.http.post( url, medico )
      .pipe(map ( (resp: any) => {
        return resp.medico;
      }));
    }
  }

}
