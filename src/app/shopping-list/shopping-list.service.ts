import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from 'app/shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
    newElementAdded = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  constructor(private http: Http) {}

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addElement(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newElementAdded.next();
  }

  addListOfElements(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.newElementAdded.next();
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.newElementAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.newElementAdded.next(this.ingredients.slice());
  }

  saveShoppingList() {
    return this.http.put('https://ng-shopping-list-dd7b7.firebaseio.com/shoppinglist.json', this.ingredients);
  }

  fetchShoppingList() {
    return this.http.get('https://ng-shopping-list-dd7b7.firebaseio.com/shoppinglist.json')
      .map(
        (response: Response) => {
          const data = response.json();
          const ingredientsFromServer: Ingredient[] = [];

          for (const ingredient of data) {
            ingredientsFromServer.push(ingredient);
          }

          this.ingredients = ingredientsFromServer;
          this.newElementAdded.next(this.ingredients.slice());

          return true;
      }).catch(
            (error: Response) => {
                return Observable.throw('Something went wrong');
            }
        );
  }
}
