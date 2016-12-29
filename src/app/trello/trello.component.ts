import { Component, OnInit, 
        trigger, state, style, transition, animate } from '@angular/core';
import { TrelloService } from '../trello.service';
import { TimerService } from '../timer.service';

@Component({
  selector: 'trello',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.css'],
  animations: [
    trigger("showSettings", [
      state("hide", style({
        'margin-left': '10%',
        'opacity': '1'
      })),
      state("show", style({
        'margin-left': '-80%',
        'opacity': '0'
      })),
      transition("hide => show", animate(300)),
      transition("show => hide", animate(500))
    ])
  ]
})
export class TrelloComponent implements OnInit {

  card;
  
  

  constructor(private trelloService:TrelloService, private timerService:TimerService) { }

  ngOnInit() {

    this.card = document.getElementById("trelloCard") || document;

    this.card.addEventListener("click", function(){
      this.trelloService.toggleDisplay();
    }.bind(this));


    // For developing:
    // event = new Event("click");
    // this.card.dispatchEvent(event);

    
  }

  

}
