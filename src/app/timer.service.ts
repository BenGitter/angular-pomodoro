import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {

  minutes:number;             // remaining minutes
  seconds:number;            // remaining seconds

  minutesTxt:string;       // string version of minutes     
  secondsTxt:string;       // string version of seconds

  timer;                          // reference to the current timer
  running:boolean = false;        // on start timer is paused
  state:string = "session"        // current state (session || break)

  sessionLenght:number = 10;   // length of session in seconds 
  breakLength:number = 5;      // length of break in seconds

  audio:HTMLAudioElement;            // will get audio element from timer component

  constructor() { 
    this.updateTime();
    this.updateStrings();
  }


  runTime(){
    this.timer = setInterval(function(){

      // Decrease minutes when seconds is 0
      if(this.seconds == 0){
        this.minutes--;
        this.seconds = 60;
      }

      // Decrease seconds every iteration
      this.seconds--;

      // Update strings
      this.updateStrings();

      // Detect if time is up
      if(this.minutes == 0 && this.seconds == 0) this.completed();


    }.bind(this), 1000);

    this.running = true;
  }

  stopTime(){
    // Stop timer and set running to false
    clearInterval(this.timer);
    this.running = false;
  }

  toggleTime(){
    // Stop or start timer on button click
    (this.running) ? this.stopTime() : this.runTime();
  }

  completed(){
    this.stopTime();                                                // Stop the timer
    this.state = (this.state == "session") ? "break" : "session";   // Change state
    this.updateTime();                                              // Get new time (depending on state)
    this.updateStrings();                                           // Update strings
    this.playSound();                                               // Play sound to indicate finished session/break
  }

  updateTime(){
    // Get new time and split in minutes and seconds;
    var newTime = (this.state == "session") ? this.sessionLenght : this.breakLength; 
    this.seconds = newTime % 60;    
    this.minutes = (newTime - this.seconds) / 60;

    console.log(this.state);
  }

  updateStrings(){
    // Update the text version of minutes and seconds
    this.secondsTxt = (this.seconds < 10) ? "0"  + this.seconds.toString() : this.seconds.toString(); 
    this.minutesTxt = (this.minutes < 10) ? "0"  + this.minutes.toString() : this.minutes.toString(); 
  }


  playSound(){
    this.audio.play();
  }

}
