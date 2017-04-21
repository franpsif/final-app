import { Subscription } from 'rxjs/Rx';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingEditComponent } from "app/shopping-list/shopping-edit/shopping-edit.component";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {       }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();

    this.subscription = this.shoppingListService.newElementAdded.subscribe(
      () => {
        this.ingredients = this.shoppingListService.getIngredients();
      });
  }  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
