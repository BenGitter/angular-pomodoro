import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../trello.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(private trelloService:TrelloService) { }

  ngOnInit() { }

}
