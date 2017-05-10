import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from '../../shared/ingredient.model';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  animations: [
    trigger('divState', [
        state('normal', style({
          'background-color': 'red',
          transform: 'translateX(0)'
        })),
        state('highlighted', style ({
          'background-color': 'blue',
          transform: 'translateX(100px)'
        })),
        transition('normal <=> highlighted', animate(300))
    ]),
    trigger('wildState', [
        state('normal', style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)'
        })),
        state('highlighted', style ({
          'background-color': 'blue',
          transform: 'translateX(100px) scale(1)'
        })),
        state('shrunken', style ({
          'background-color': 'green',
          transform: 'translateX(0) scale(0.5)'
        })),
        transition('normal => highlighted', animate(300)),
        transition('highlighted => normal', animate(800)),
        transition('shrunken <=> *', [
          style({
            'background-color': 'orange'
          }),
          animate(1000, style ({
            borderRadius: '50px'
          })),
          animate(500)
        ])
    ])
  ]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  state = 'normal';
  wildState = 'normal';

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addElement(newIngredient);
    }

    this.editMode = false;
    form.reset();

    // For animations only
    this.wildState = 'shrunken';
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;

    // For animations only
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  animationStarted(event) {
    console.log(event);
  }

  animationEnded(event) {
    console.log(event);
  }
}
