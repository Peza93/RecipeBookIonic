import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipeService } from '../../services/recpies';

/**
 * Generated class for the RecipePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private slService: ShoppingListService,
              private recipeService: RecipeService) {
  }
  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'Edit', recipe: this.recipe, index: this.index });
  }
  onAddIngredient() {
    this.slService.addItems(this.recipe.ingredients);
  }
  onDelete() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }


}
