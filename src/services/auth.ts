import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {

  constructor(private alert: AlertController) {

  }

 async signup({ email, password }) {
   try {
     return await firebase.auth().createUserWithEmailAndPassword(email, password);
   } catch (error) {
     this.alert.create({
       title: 'Error with a signup',
       message: error.message,
       buttons: ['Ok']
     }).present();
   }
 };

  async  signin({ email, password}) {
    try {
      return await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.alert.create({
        title: 'Error with a signin',
        message: error.message,
        buttons: ['Ok']
      }).present();
    }
  }

  logout() {
    firebase.auth().signOut()
  }

  get user() {
    return firebase.auth().currentUser;
  }
}
