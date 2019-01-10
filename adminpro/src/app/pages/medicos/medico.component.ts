import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { Router } from '@angular/router';

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
    public _hospitalService: HospitalService
    public router: Router
  ) { }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => this.hospitales = resp.hospitales );
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

}
