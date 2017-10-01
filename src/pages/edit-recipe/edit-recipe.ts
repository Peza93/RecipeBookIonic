import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from '../../services/recpies';
import { Recipe } from '../../models/recipe';

/**
 * Generated class for the EditRecipePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeService: RecipeService,
              private navCtrl: NavController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initialieForm();
  }
  onSubmit() {
    if(this.recipeForm.value.ingredients.length > 0 ) {
      this.recipeForm.value.ingredients = this.recipeForm.value.ingredients.map(name => {
        return { name, amount: 0}
      });
    }
    if ( this.mode === 'Edit') {
      this.recipeService.editRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.navCtrl.popToRoot();

  }

  private initialieForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode === 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      ingredients = this.recipe.ingredients.map(ingredient => new FormControl(ingredient.name, Validators.required));
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
        title: 'What do you want to do ?',
        buttons: [
          {
            text: 'Add ingredient',
            handler: () => {
              this.createNewIngredientAlert().present();
            }
          },
          {
            text: 'Remove all ingredient',
            role: 'destructive',
            handler: () => {
              const fmArray: FormArray =  <FormArray>this.recipeForm.get('ingredients');
              const len = fmArray.length;
              if(len > 0 ) {
                for (let i = len - 1; i >= 0;i--) {
                  fmArray.removeAt(i);
                }
                const toast = this.toastCtrl.create({
                  message: "All ingredients were deleted",
                  duration: 1000,
                  position: 'bottom'
                });
                toast.present();
              }
            }
          },
          {
            text: "Cancel",
            role: 'cancel'
          }
        ]
    });
    actionSheet.present();
  }

  createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if( data.name.trim() === '' || data.name === null) {
              const toast = this.toastCtrl.create({
                  message: "Please enter the valid value",
                  duration: 1000,
                  position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: "Item added",
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }




}
