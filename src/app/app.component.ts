import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAkp3eSeM-TPkP7vWymtCYC3oZuEPO53V4',
      authDomain: 'ng-recipe-book-d1fa5.firebaseapp.com'
    });
  }
}
