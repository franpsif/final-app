import { EventEmitter } from '@angular/core';

import { Ingredient } from "app/shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {
    newElementAdded = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addElement(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newElementAdded.next();
  }    

  addListOfElements(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.newElementAdded.next();
  }
}