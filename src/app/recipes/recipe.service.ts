import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
    new Recipe('A test recipe 1', 'A test 1', 'https://c1.staticflickr.com/6/5514/18218250593_2f8a956a35_b.jpg'),
    new Recipe('A test recipe 2', 'A test 2', 'https://c1.staticflickr.com/6/5514/18218250593_2f8a956a35_b.jpg')
  ];

  getRecipes(){
    return this.recipes.slice();
  }
}