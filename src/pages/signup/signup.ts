import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService, private loadingCtrl: LoadingController) {

  }
  async onSignup(f: NgForm) {
    if(f.valid) {
      const loading = this.loadingCtrl.create({
        content: 'Signin up...'
      });
      loading.present();
     const user = await this.authService.signup(f.value);
     loading.dismiss();
    }
  }

}
