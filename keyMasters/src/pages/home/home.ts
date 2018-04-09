import { Component } from '@angular/core';
import { ModalController, ToastController, NavController, NavParams } from 'ionic-angular';
import{HttpClient, HttpHeaders} from "@angular/common/http";
import{FormBuilder, FormGroup, Validators} from '@angular/forms';

//import { EmailComposer } from '@ionic-native/email-composer'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public form : FormGroup;
  public department : any;
  public email : any;
  public name : any;
  public id : any;
  public number : any;
  public keys : any;
  public authorized : any;
  private _HOST : string = "http://192.168.1.177:8080/";
  constructor
  (
    private _FB : FormBuilder,
    private _HTTP : HttpClient,
    private navCtrl : NavController,
    private navParams : NavParams,
    private _MODAL : ModalController,
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
  addRecord(): void{

    let department :any = this.form.controls['department'].value,
    email :any = this.form.controls['email'].value,
    name :any = this.form.controls['name'].value,
    id :any = this.form.controls['id'].value,
    number :any = this.form.controls['number'].value,
    keys :any = this.form.controls['keys'].value,
    headers :any = new HttpHeaders({'Content-Type' : 'application/json'}),
    options :any = {department : department, email : email, name : name, id : id, number : number, keys : keys},
    url :any = this._HOST + "api/home";

    this._HTTP
      .post(url, options, headers)
      .subscribe((data : any) =>
    {
      this.clearForm();
      this.displayNotification(name + ' your key request was successfully submitted')
    },
    (error :any) =>
    {
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
