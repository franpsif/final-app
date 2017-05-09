import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

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

  constructor(private http: Http, private authservice: AuthService) {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  saveRecipes() {
    const token = this.authservice.getToken();

    return this.http.put('https://ng-recipe-book-d1fa5.firebaseio.com/recipes.json?auth=' + token, this.recipes);
  }

  fetchRecipes() {
    const token = this.authservice.getToken();

    return this.http.get('https://ng-recipe-book-d1fa5.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const data = response.json();
          const recipesFromServer: Recipe[] = [];

          for (const recipe of data) {
            recipesFromServer.push(recipe);
          }

          this.recipes = recipesFromServer;
          this.recipesChanged.next(this.getRecipes());

          return true;
      }).catch(
            (error: Response) => {
                return Observable.throw('Something went wrong');
            }
        );
  }
}
