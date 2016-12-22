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
      transition("void => *", animate(400))
    ])
  ]
})

export class PickerComponent implements OnInit {

  constructor(private trelloService:TrelloService) { 
    console.log(trelloService.pickerState);
  }

  ngOnInit() {
    
  }

}
