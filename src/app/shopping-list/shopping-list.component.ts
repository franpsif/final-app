import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingEditComponent } from "app/shopping-list/shopping-edit/shopping-edit.component";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10)
  ];

  constructor() { }

  ngOnInit() {
  }

  onElementAdded(data:{name: string, amount: string}){
    if(data.name !== '' && data.amount !== ''){
      this.ingredients.push(new Ingredient(data.name, +data.amount));
    }
  }

}
