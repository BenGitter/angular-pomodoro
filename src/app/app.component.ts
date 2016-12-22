import { Component } from '@angular/core';

import { TrelloService } from './trello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TrelloService ]
})
export class AppComponent {

}
