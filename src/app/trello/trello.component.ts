import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../trello.service';

@Component({
  selector: 'trello',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.css']
})
export class TrelloComponent implements OnInit {

  card;
  home:HTMLElement;
  spacer:HTMLElement;

  constructor(private trelloService:TrelloService) { }

  ngOnInit() {

    this.card = document.getElementById("trelloCard") || document;

    this.card.addEventListener("click", function(){
      this.trelloService.toggleDisplay();
    }.bind(this));


    // For developing:
    // event = new Event("click");
    // this.card.dispatchEvent(event);

    this.home = <HTMLElement>document.getElementsByClassName("home")[0];
    this.spacer = <HTMLElement>document.getElementsByClassName("spacer")[0];

    this.positioning();   // run it on start
  }

  positioning(){
    var height = (this.home.offsetHeight - 500) * 0.5;
    this.spacer.style.height = height + "px";
  }

}
