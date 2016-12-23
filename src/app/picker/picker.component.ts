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

  trelloColors = {
    "blue":   { "board": "#0067A2", "list": "rgba(0,103,162, 0.4)"  },
    "orange": { "board": "#B37A2C", "list": "rgba(197,122,44, 0.4)" },
    "green":  { "board": "#458130", "list": "rgba(69,129,48, 0.4)"  },
    "red":    { "board": "#963B2A", "list": "rgba(150,59,42, 0.4)"  },
    "purple": { "board": "#745286", "list": "rgba(116,82,134, 0.4)" },
    "pink":   { "board": "#AE4C7B", "list": "rgba(174,76,123, 0.4)" },
    "lime":   { "board": "#40A25B", "list": "rgba(64,162,91, 0.4)"  },
    "sky":    { "board": "#0094AD", "list": "rgba(0,148,173, 0.4)"  },
    "grey":   { "board": "#62696D", "list": "rgba(98,105,109, 0.4)" }
  };

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

  selectCard(card){
    this.trelloService.selectedCard = card;
    this.trelloService.pickerState = false;
    
    this.trelloService.changeDisplayName();
  }

}
