import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor() { console.log('servicio hospital'); }

  cargarHospitales() {

  }

  obtenerHospital( id: string ) {

  }

  borrarHospital( id: string ) {

  }

  crearHospital( nombre: string ) {

  }

  buscarHospital( termino: string ) {

  }

  actualizarHospital( hospital: Hospital ) {
    
  }

}
