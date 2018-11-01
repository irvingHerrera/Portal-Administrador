import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    this.regresaObservable()
    // .pipe( retry(2) )
    .subscribe( numero => {
        console.log('Subs', numero);
      },
      error => console.error('Error en el obs', error),
      () => console.log('Observador termino')
    );

  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if ( contador === 3 ) {
          clearInterval(intervalo);
          observer.complete();
        }

        /*if ( contador === 2) {
          //clearInterval(intervalo);
          observer.error('Error');
        }*/

      }, 1000);

    } ).pipe(
      map( res => {
          return res.valor;
      })
    );

  }

}
