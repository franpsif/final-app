import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() elementAdded = new EventEmitter<{name: string, amount: number}>();

  @ViewChild('nameInput') selectedName: ElementRef;
  @ViewChild('amountInput') selectedAmount: ElementRef;

  newItemName: string;
  newItemAmount: number;

  constructor() { }

  ngOnInit() {
  }

  onAddElementToShoppingList(){
    this.newItemName = this.selectedName.nativeElement.value;
    this.newItemAmount = this.selectedAmount.nativeElement.value;

    this.elementAdded.emit({name: this.newItemName, amount: this.newItemAmount});
  }
}
