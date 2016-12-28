import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../trello.service';

@Component({
  selector: 'trello',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.css']
})
export class TrelloComponent implements OnInit {

  card;
  
  

  constructor(private trelloService:TrelloService) { }

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
