import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, PopoverController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";
import { AuthService } from '../../services/auth';
import 'rxjs/Rx';
import { DatabaseOptions } from '../database-options/database-options';
/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItems: Ingredient[];
  constructor(private slService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private authService: AuthService) {}


  onAddItem(form: NgForm): void {
    this.slService.addItem(form.value);
    form.reset();
    this.loadItems();
  }
  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.ingredients;
  }

  removeItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

   onSelectOptions(ev) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptions);
    popover.present({ ev });
    popover.onDidDismiss(
      async data => {
        if (!data) { return; }
        try {
          loading.present();
          const token = await this.authService.user.getToken();
          let list = [];
          if (data.action === 'load') {
               list = await this.slService.loadList(token);
          } else if( data.action == 'store') {
             list = await  this.slService.storeList(token);
          }
          this.listItems = list;
          loading.dismiss();
        } catch (error) {
          try {
            this.handleError(error.json().error);
            loading.dismiss();
          } catch (error) {
            this.handleError(error);
            loading.dismiss();
          }
        }

    });
  }

  private handleError(message) {
    this.alertCtrl.create({
      title: "Error occured",
      message,
      buttons: ['ok']
    }).present();
  };


}
