import { Component, OnInit } from '@angular/core';
import { reject } from 'q';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then( () => {
      console.log('Termino');
    })
    .catch( error => console.log('Error en la promesa', error));

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolver, reject) => {

        let contador = 0;

        const intervalo = setInterval( () => {
          contador += 1;
          console.log(contador);
          if( contador === 3 ) {
            resolver(true);
            // reject("Simplemente un error");
            clearInterval(intervalo);
          }
        }, 1000);
    } );

  }


}
