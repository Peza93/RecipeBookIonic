import { Recipe } from '../models/recipe';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth';
import 'rxjs/Rx';
@Injectable()
export class RecipeService {
  constructor(private http: Http,
              private authService: AuthService) {}
  private _recipes: Recipe[] = [];

  addRecipe({ title, description, difficulty, ingredients}) {
    this._recipes.push(new Recipe(title, description, difficulty, ingredients))
  };

  getRecipes() {
    return this._recipes.slice();
  }

  editRecipe(index: number, { title, description, difficulty, ingredients}) {
    this._recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  get recipes() {
    return this._recipes.slice();
  }

  removeRecipe(index: number) {
    this._recipes.splice(index, 1);
  }

  storeRecipe(token: string) {
    const userId = this.authService.user.uid;
    return this.http.put(`https://ionic-recipe-book-1c5b3.firebaseio.com/${userId}/recipes.json?auth=${token}`, this._recipes)
      .map(response => {
        const recipes  = response.json() ? response.json(): [];
        for(let item of recipes) {
          if(!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return recipes;
      })
      .toPromise();
  }
  loadRecipe(token: string) {
    const userId = this.authService.user.uid;
    return this.http.get(`https://ionic-recipe-book-1c5b3.firebaseio.com/${userId}/recipes.json?auth=${token}`)
      .map(response => response.json())
      .do(data => { this._recipes = data } )
      .toPromise();
  }

}
