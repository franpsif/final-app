import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService{

    private recipes: Recipe[] = [
    new Recipe('A test recipe 1', 'A test 1', 'https://c1.staticflickr.com/6/5514/18218250593_2f8a956a35_b.jpg', [
      new Ingredient('Banana', 3),
      new Ingredient('Meat', 1)
    ]),
    new Recipe('A test recipe 2', 'A test 2', 'https://c1.staticflickr.com/6/5514/18218250593_2f8a956a35_b.jpg', [
      new Ingredient('Orange', 5),
      new Ingredient('Fish', 2)
    ])
  ];

  getRecipe(index: number){
    return this.recipes[index];
  }

  getRecipes(){
    return this.recipes.slice();
  }
}