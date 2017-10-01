import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {


  constructor(private authService: AuthService, private loadingCtrl: LoadingController) {
  }

  async onSignin(f: NgForm) {
    if(f.valid) {
      const loading = this.loadingCtrl.create({
        content: 'Signing up...'
      });
      loading.present();
      const user = await this.authService.signin(f.value);
      loading.dismiss();
    }
  }

}
