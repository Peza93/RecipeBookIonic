import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, PopoverController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recpies';
import { RecipePage } from '../recipe/recipe';
import { AuthService } from '../../services/auth';
import { DatabaseOptions } from '../database-options/database-options';

/**
 * Generated class for the RecipesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[];

  constructor(private navCtrl: NavController,
              private recipeService: RecipeService,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private authService: AuthService) {
  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, { recipe, index });
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
            list = await this.recipeService.loadRecipe(token);
          } else if (data.action == 'store') {
            list = await this.recipeService.storeRecipe(token);
          }
          this.recipes = list;
        } catch (error) {
          try {
            this.handleError(error.json().error);
          } catch (error) {
            this.handleError(error);
          }
        }
        loading.dismiss();
      });
  }

  private handleError(message) {
    const alert = this.alertCtrl.create({
      title: "Error occured",
      message,
      buttons: ['ok']
    });
    alert.present();

  };

}
