import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

//import { EmailComposer } from '@ionic-native/email-composer'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //private _HOST: string = "http://localhost:8080/";

  constructor
  (public navCtrl : NavController) {

  }
  addRecord() : void
  {
    this.navCtrl.push('request');
  }
}
