import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../trello.service';

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
  time:HTMLElement

  constructor(private trelloService:TrelloService) { }

  ngOnInit() { 
    this.home = <HTMLElement>document.getElementsByClassName("home")[0];
    this.spacer = <HTMLElement>document.getElementsByClassName("spacer")[0];
    this.play = <HTMLElement>document.getElementById("play");
    this.circle1 = <HTMLElement>document.getElementsByClassName("circle")[0];
    this.circle2 = <HTMLElement>document.getElementsByClassName("circle")[1];
    this.time = <HTMLElement>document.getElementById("time");

    this.positioning();   // run it on start
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


}
