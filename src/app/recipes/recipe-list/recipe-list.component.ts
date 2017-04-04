import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'A test', 'https://c1.staticflickr.com/6/5514/18218250593_2f8a956a35_b.jpg'),
    new Recipe('A test recipe', 'A test', 'https://c1.staticflickr.com/6/5514/18218250593_2f8a956a35_b.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
