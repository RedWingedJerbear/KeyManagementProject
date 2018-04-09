import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

//import { EmailComposer } from '@ionic-native/email-composer'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public department: any;
  public email: any;
  public name: any;
  public id: any;
  public number: any;
  public keys: any;
  public authorized: any;
  //private _HOST: string = "http://localhost:8080/";

  constructor
  (public navCtrl : NavController,
   private _TOAST: ToastController) {

  }
  addRecord() : void
  {
    this.navCtrl.push('request');
  }
}
