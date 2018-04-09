import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * Generated class for the AddRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'request'
})
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {
  public form : FormGroup;
  public department : any;
  public email : any;
  public name : any;
  public id : any;
  public number : any;
  public keys : any;
  public authorized : any;
  private _ID : String;
  public pageTitle : string;
  private _HOST : string = "http:// 192.168.1.177:8080/";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _FB : FormBuilder,
              private _HTTP : HttpClient,
              private _TOAST : ToastController)
  {
    this.form = this._FB.group({
      'department' : ['', Validators.required],
      'email' : ['', Validators.required],
      'name' : ['', Validators.required],
      'id' : ['', Validators.required],
      'number' : ['', Validators.required],
      'keys' : ['', Validators.required]
    });
  }

  ionViewDidLoad() : void {
    if(this.navParams.get("record"))
    {
      this._ID = this.navParams.data.record._id;
      this.department = this.navParams.data.record.department;
      this.email = this.navParams.data.record.email;
      this.name = this.navParams.data.record.name;
      this.id = this.navParams.data.record.id;
      this.number = this.navParams.data.record.number;
      this.keys = this.navParams.data.record.keys;
      this.pageTitle = "Update";
    }
    else {
      this.pageTitle = "Create";
    }
    console.log('ionViewDidLoad AddRequestPage');
  }
  manageRequests(): void
  {
    let department :any = this.form.controls['department'].value,
      email :any = this.form.controls['email'].value,
      name :any = this.form.controls['name'].value,
      id :any = this.form.controls['id'].value,
      number :any = this.form.controls['number'].value,
      keys :any = this.form.controls['keys'].value,
      headers :any = new HttpHeaders({'Content-Type' : 'application/json'}),
      options :any = {department : department, email : email, name : name, id : id, number : number, keys : keys},
      url :any = this._HOST + "api/home";

    if (!this.navParams.get("record"))
    {

    }
    else {
      this._HTTP.post(url, options, headers).subscribe((data: any) => {
        console.log("Got data", data);
        this.clearForm();
        this.displayNotification(name + ' your key request was successfully submitted');
        },
        (error: any) => {
          console.dir(error);
        });
    }
      this._HTTP.post(url, options, headers).subscribe((data: any) => {
          this.clearForm();
          this.displayNotification(name + ' your key request was successfully submitted')
        },
        (error: any) => {
          console.dir(error);
        });
  }

  clearForm() : void
  {
    this.department = "";
    this.email = "";
    this.name = "";
    this.id = "";
    this.number = "";
    this.keys = "";
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
