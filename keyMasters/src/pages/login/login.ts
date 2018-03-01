import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    }
  


  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  loginEnter(event) {
    if (event.keyCode == 13) {
      this.goToHome();
    }
  }
}

