import { Component, OnInit } from '@angular/core';

import { TrelloService } from '../trello.service';
import { TimerService } from '../timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  spacer:HTMLElement;
  home:HTMLElement;
  play:HTMLElement;
  circle1:HTMLElement;
  circle2:HTMLElement;
  time:HTMLElement;
  audio:HTMLAudioElement;

  // Circle animation
  path:SVGPathElement;  
  pathLength:number;   

  constructor(private trelloService:TrelloService, private timerService:TimerService) { }

  ngOnInit() { 
    this.home = <HTMLElement>document.getElementsByClassName("home")[0];
    this.spacer = <HTMLElement>document.getElementsByClassName("spacer")[0];
    this.play = <HTMLElement>document.getElementById("play");
    this.circle1 = <HTMLElement>document.getElementsByClassName("circle")[0];
    this.circle2 = <HTMLElement>document.getElementsByClassName("circle")[1];
    this.time = <HTMLElement>document.getElementById("time");
    this.audio = <HTMLAudioElement>document.getElementsByTagName("audio")[0];

    this.timerService.audio = this.audio;

    this.positioning();   // run it on start


    // Circle animation
    this.path = <SVGPathElement>document.querySelector("#circle-top path");
    this.pathLength = this.path.getTotalLength();
    console.log(this.pathLength);
    this.path.style.transition = 'none';
    this.path.style.strokeDasharray = this.pathLength + ' ' + this.pathLength;
    // this.path.style.strokeDashoffset = length.toString();
    this.path.getBoundingClientRect();
    this.path.style.transition = 'stroke-dashoffset 1s linear';

  }


  positioning(){
    var height = (this.home.offsetHeight - 500)*0.9;
    var offsetCircle = height/3;

    this.spacer.style.height = height/3*2 + "px";
    this.circle1.style.top = (offsetCircle + 70) + "px";
    this.circle2.style.top = (offsetCircle + 70) + "px";
    this.play.style.marginTop = (175+height-offsetCircle) + "px";
    this.time.style.top = (offsetCircle + 140) + "px";
  }

  updateCircle(){
    var i = 0;
    var total = 10;

    setInterval(function(){
      i++;
      var part = i/total;

      if(i > total){
        return false;
      }

      this.path.style.strokeDashoffset = part*this.pathLength;

    }.bind(this), 1000);
  }


}
