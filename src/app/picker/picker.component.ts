import { Component, OnInit, 
        trigger, state, style, transition, animate } from '@angular/core';
import { TrelloService } from '../trello.service';

@Component({
  selector: 'picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css'],
  animations: [
    trigger("fade", [
      state("void", style({
        'opacity': '0'
      })),
      state("in", style({
        'opacity': '1'
      })),
      transition("void => *", animate(400)),
      transition("* => void", animate(400))
    ])
  ]
})

export class PickerComponent implements OnInit {

  boards;
  lists;
  cards;

  constructor(private trelloService:TrelloService) { 
    
  }

  ngOnInit() {
    
  }

  toLists(board){
    this.trelloService.selectedBoard = board;
    this.trelloService.pickerView = "list";
  }

  toCards(list){
    this.trelloService.selectedList = list;
    this.trelloService.pickerView = "card";
  }

  closePicker(){
    this.trelloService.pickerState = false;
  }

  goBack(){
    this.trelloService.pickerView = (this.trelloService.pickerView == "card") ? "list" : "board";
  }

}
