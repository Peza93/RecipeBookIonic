import { Ingredient } from "../models/ingredient";
import { Injectable } from '@angular/core';
import { AuthService } from './auth';
import { Http } from '@angular/http';
@Injectable()
export class ShoppingListService {

  constructor(private http: Http, private authService: AuthService) {}
  private _ingredients: Ingredient[] = [];

  addItem({ name, amount}) {
    this._ingredients.push(new Ingredient(name, amount));
  }

  addItems(items: Ingredient[]) {
    this._ingredients.push(...items);
  }

  get ingredients() {
    return this._ingredients.slice();
  }

  removeItem(index: number) {
    this._ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.user.uid;
    return this.http.put(`https://ionic-recipe-book-1c5b3.firebaseio.com/${userId}/shopping-list.json?auth=${token}`, this._ingredients)
      .map(response => response.json())
      .toPromise();
  }

  loadList(token: string) {
    const userId = this.authService.user.uid;
    return this.http.get(`https://ionic-recipe-book-1c5b3.firebaseio.com/${userId}/shopping-list.json?auth=${token}`)
      .map(response => response.json())
      .do(data => {this._ingredients = data; })
      .toPromise();
  }

}
