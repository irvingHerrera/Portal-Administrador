import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  totalRegistro: number;
  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {

    this.cargando = true;

    this._medicoService.cargarMedicos(this.desde)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.totalRegistro = resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;
    });
  }

  buscarMedicos( busqueda: string) {
    if ( busqueda.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedicos( busqueda )
    .subscribe( (hospital: Medico[]) => {
        this.medicos = hospital;
        this.cargando = false;
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
    this.cargarMedicos();

  }

  borrarMedico( medico: Medico) {

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if ( borrar ) {
          this._medicoService.borrarMedico( medico._id )
          .subscribe( resp => {
            swal('Medico borrado', 'El medico a sido eliminado correctamente', 'success');
            this.cargarMedicos();
          });
      }
    });

    
  }

}
