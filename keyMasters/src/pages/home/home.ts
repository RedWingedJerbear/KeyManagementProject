import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
//import { EmailComposer } from '@ionic-native/email-composer'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items : Array<any>;
  private _HOST: string = "http://localhost:8080/";

  constructor
  (public navCtrl : NavController,
  //private _TOAST : ToastController
   private _HTTP : HttpClient) {

  }

  addRecord() : void
  {
    this.navCtrl.push('request');
  }

  retrieveRecords() : void
  {
    console.log("getting requests");
    this._HTTP.get(this._HOST + "api/requests").subscribe((data:any) =>{
      this.items = data.records;
    },
      (error : any) =>{
      console.dir(error);
      });
  }
}
