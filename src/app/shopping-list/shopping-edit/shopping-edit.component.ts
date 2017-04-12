import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef } from '@angular/core';
import { ShoppingListService } from "app/shopping-list/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') selectedName: ElementRef;
  @ViewChild('amountInput') selectedAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddElementToShoppingList(){
    this.shoppingListService.addElement(new Ingredient(this.selectedName.nativeElement.value, +this.selectedAmount.nativeElement.value));
  }
}
