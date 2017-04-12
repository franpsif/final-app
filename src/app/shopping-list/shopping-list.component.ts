import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingEditComponent } from "app/shopping-list/shopping-edit/shopping-edit.component";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {       }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.shoppingListService.newElementAdded.subscribe(
      () => {
        this.ingredients = this.shoppingListService.getIngredients();
      });
  }  

}
