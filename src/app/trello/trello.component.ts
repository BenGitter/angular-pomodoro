import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../trello.service';

@Component({
  selector: 'trello',
  templateUrl: './trello.component.html',
  styleUrls: ['./trello.component.css']
})
export class TrelloComponent implements OnInit {

  // DOM elements
  title:HTMLElement;
  path:HTMLElement;

  // Arrays with data
  Boards:Array<any>;
  Lists:Array<any>;
  Cards:Array<any>;

  // Selected
  selectedBoard:any = {
    name: "Board"
  };
  selectedList:any = {
    name: "List"
  };
  selectedCard:any = {
    name: "Select Trello Card..."
  };



  constructor(private trelloService:TrelloService) { }

  ngOnInit() {
    this.title = <HTMLElement>document.getElementsByClassName("title")[0];
    this.path = <HTMLElement>document.getElementsByClassName("head")[0];

    this.title.addEventListener("click", function(){
      this.trelloService.toggleDisplay();
    }.bind(this));

    // For developing:
    // event = new Event("click");
    // this.title.dispatchEvent(event);
  }

}
