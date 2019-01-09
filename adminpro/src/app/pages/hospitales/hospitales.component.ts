import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = true;
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistro = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarHospitales() );
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde)
    .subscribe( (resp: any) => {
      console.log(resp, 'respuesta hospital');
      this.totalRegistro = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospital( busqueda: string) {
    console.log(busqueda);
  }

  mostrarModal( id: string) {
    console.log('hola');
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
    this.cargarHospitales();
  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if ( borrar ) {
          this._hospitalService.borrarHospital( hospital._id )
          .subscribe( resp => {
            this.cargarHospitales();
          });
      }
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
    this.cargarHospitales();

  }

}
