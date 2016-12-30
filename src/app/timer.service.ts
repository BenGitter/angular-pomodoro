import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {

  minutes:number;           // remaining minutes
  seconds:number;           // remaining seconds

  minutesTxt:string;       // string version of minutes     
  secondsTxt:string;       // string version of seconds

  timer;                            // reference to the current timer
  running:boolean = false;          // on start timer is paused
  state:string = "session"          // current state (session || break)

  sessionLength:number = 2;         // length of session in minutes 
  breakLength:number = 1;           // length of break in minutes

  audio:HTMLAudioElement;           // will get audio element from timer component

  showSettings:boolean = false;     // settings displayed?
  showSettingsTxt = "hide";         // string version for animation

  timerStarted:boolean = false;     // check if timer has started

  constructor() { 
    this.updateTime();              // fill minutes and seconds
    this.updateStrings();           // fill string version of minutes and seconds
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
    this.timerStarted = true;
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
    this.timerStarted = false;                                      // Set timerStarted back to false
  }

  updateTime(){
    // Get new time and split in minutes and seconds;
    this.minutes = (this.state == "session") ? this.sessionLength : this.breakLength; 
    this.seconds = 0;    

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

  toggleSettings(){
    this.showSettings = !this.showSettings;
    this.showSettingsTxt = (this.showSettings) ? "show" : "hide";
  }

}
