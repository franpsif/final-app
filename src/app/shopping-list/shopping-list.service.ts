import { EventEmitter } from '@angular/core';

import { Ingredient } from "app/shared/ingredient.model";

export class ShoppingListService {
    newElementAdded = new EventEmitter();

    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addElement(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newElementAdded.emit();
  }    

  addListOfElements(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.newElementAdded.emit();
  }
}