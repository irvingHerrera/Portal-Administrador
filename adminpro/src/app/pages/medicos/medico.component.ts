import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,,
    public _modalUploadService: ModalUploadService,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {

    this.activateRoute.params
    .subscribe( params => {
      const id = params['id'];

      if ( id !== 'nuevo') {
          this.cargarMedico( id );
      }

    });

  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => this.hospitales = resp.hospitales );

    this._modalUploadService.notificacion
    .subscribe( resp => this.medico.img = resp.medico.img );
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
    .subscribe( medico => {
       this.medico = medico;
       this.medico.hospital = medico.hospital._id;
       this.cambioHospital( this.medico.hospital );
      });
  }

  guardarMedico( f: NgForm ) {

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico(f.value)
    .subscribe( (resp: Medico) => {
     swal('Medico Creado', resp.nombre, 'success');
     this.medico._id = resp._id;
     this.router.navigate(['/medico', resp._id]);
    });

  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital( id )
    .subscribe (hospital => {
      this.hospital = hospital;
    });
  }

  cambiarFoto() {
   this._modalUploadService.mostrarModal( 'medicos', this.medico._id);
  }

}
