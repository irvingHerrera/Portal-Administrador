import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DOCUMENT } from '@angular/platform-browser';
import { element } from 'protractor';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService ) {
   }

  ngOnInit() {
    this.colocarCheck();
  }


  cambiarColor(tema: string, link: any) {
    this._ajustes.aplicarTema(tema);
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');

    for( let elemento of selectores) {
      elemento.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    console.log(tema);
    for ( let elemento of selectores) {
      if ( elemento.getAttribute('data-theme') === tema) {
        elemento.classList.add('working');
        break;
      }
    }

  }

}
