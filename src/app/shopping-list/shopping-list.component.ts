import { Subscription } from 'rxjs/Rx';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingEditComponent } from 'app/shopping-list/shopping-edit/shopping-edit.component';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list1', [
        state('in', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          animate(300)
        ]),
        transition('* => void', [
          animate(300, style({
            transform: 'translateX(+100px)',
            opacity: 0
          }))
        ])
    ]),
    trigger('list2', [
        state('in', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        transition('void => *', [
          animate(1000, keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8
            }),
            style({
              transform: 'translateX(0px)',
              opacity: 1,
              offset: 1
            })
          ]))
        ]),
        transition('* => void', [
          group([
            animate(300, style({
              color: 'red'
            })),
            animate(300, style({
              transform: 'translateX(+100px)',
              opacity: 0
            }))
          ])
        ])
    ])
   ]
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

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
