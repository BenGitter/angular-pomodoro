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
        'margin-left': '0',
        'opacity': '1'
      })),
      state("hide", style({
        'margin-left': '100%',
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

}
