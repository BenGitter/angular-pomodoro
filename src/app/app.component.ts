import { Component } from '@angular/core';

import { TrelloService } from './trello.service';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TrelloService,
               TimerService ]
})
export class AppComponent {

}
