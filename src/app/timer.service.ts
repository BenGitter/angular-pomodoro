import { Injectable } from '@angular/core';

function _window() : any {
   // return the global native browser window object
   return window;
}

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

  // Stuff for Audio Web API
  winRef = _window();
  soundBuffer = null;
  context = new (this.winRef.AudioContext || this.winRef.webkitAudioContext);
  source;

  constructor() { 
    this.updateTime();              // fill minutes and seconds
    this.updateStrings();           // fill string version of minutes and seconds

    this.loadSound();               // load sound
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


  // playSound(){
  //   this.audio.play();
  // }

  toggleSettings(){
    this.showSettings = !this.showSettings;
    this.showSettingsTxt = (this.showSettings) ? "show" : "hide";
  }

  loadSound() {
    var request = new XMLHttpRequest();
    var url = "assets/beep.mp3";
    
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
      this.context.decodeAudioData(request.response, function(buffer) {
        this.soundBuffer = buffer;
      }.bind(this), function(){});
    }.bind(this);
    request.send();
  }

  playSound(){
    this.source = this.context.createBufferSource();        // creates a sound source
    this.source.buffer = this.soundBuffer;                  // tell the source which sound to play
    this.source.connect(this.context.destination);          // connect the source to the context's destination (the speakers)
    this.source.start();                                                         
  }

}
