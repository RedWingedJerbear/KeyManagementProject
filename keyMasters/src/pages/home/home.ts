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
   private _TOAST : ToastController,
   private _HTTP : HttpClient) {

  }

  addRecord() : void
  {
    this.navCtrl.push('request');
  }

  retrieveRecord() : void
  {
    console.log("getting requests");
    this._HTTP.get(this._HOST + "api/requests").subscribe((data:any) =>{
      this.items = data.records;
    },
      (error : any) =>{
      console.dir(error);
      });
  }

  updateRecord(item : any) : void{
    this.navCtrl.push('request', {record : item});
  }

  deleteRecord(item : any) : void
  {
    let recordID : string = item._id,
        url : any = this._HOST + "api/delete/" + recordID;
    this._HTTP.delete(url).subscribe((data : any) =>{
      this.retrieveRecord();
      this.displayNotification(data.records.request_name + ' was successfully deleted')
    },
      (error : any) =>{
      console.dir(error);
      });
  }
  displayNotification(message : string) : void
  {
    let toast = this._TOAST.create({
      message 	: message,
      duration 	: 3000
    });
    toast.present();
  }
}
