import { AuthService } from '../../auth/auth.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Response } from '@angular/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService,
        private authService: AuthService) {}

    saveData () {
        this.recipeService.saveRecipes()
            .subscribe(
                (response) => console.log('Recipes saved!'),
                (error) => console.log('Error saving recipes')
            );

        this.shoppingListService.saveShoppingList()
        .subscribe(
            (response) => console.log('Shopping list saved!'),
            (error) => console.log('Error saving shopping list')
        );
    }

    fetchData () {
        this.recipeService.fetchRecipes()
            .subscribe(
                (response) => console.log('Recipes fetched!'),
                (error) => console.log('Error fetching recipes')
            );

        this.shoppingListService.fetchShoppingList()
        .subscribe(
            (response) => console.log('Shopping list fetched!'),
            (error) => console.log('Error fetching shopping list')
        );
    }

    onLogout() {
        this.authService.logout();
    }
}
