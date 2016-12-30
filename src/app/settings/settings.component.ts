import { Component, OnInit, 
        trigger, state, style, transition, animate } from '@angular/core';

import { TimerService } from '../timer.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  animations: [
    trigger("showSettings", [
      state("show", style({
        'margin-left': '5%',
        'opacity': '1'
      })),
      state("hide", style({
        'margin-left': '90%',
        'opacity': '0'
      })),
      transition("hide => show", animate(500)),
      transition("show => hide", animate(300))
    ])
  ]
})
export class SettingsComponent implements OnInit {

  constructor(private timerService:TimerService) { }

  ngOnInit() {
  }


  changeLength(increase:boolean, state:string){
    // (In/de)crease (sessionLenght || breakLength) : min=1, max=99
    if(state == "session"){
      if(increase && this.timerService.sessionLength < 99){
        this.timerService.sessionLength++;
      } 
      if(!increase && this.timerService.sessionLength > 1){
        this.timerService.sessionLength--;
      }
    }else if(state == "break"){
      if(increase && this.timerService.breakLength < 99){
        this.timerService.breakLength++;
      }
      if(!increase && this.timerService.breakLength > 1){
        this.timerService.breakLength--;
      }
    }

    if(!this.timerService.timerStarted){
      this.timerService.updateTime();
      this.timerService.updateStrings();
    }
  }

}
