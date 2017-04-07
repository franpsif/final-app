import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() ingredients: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
