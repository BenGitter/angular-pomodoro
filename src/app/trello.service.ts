import { Injectable } from '@angular/core'; 

declare var Trello:any;

@Injectable()
export class TrelloService {

  pickerState:boolean = false;
  
  constructor() {
 
  }

  toggleDisplay(){
    this.pickerState = !this.pickerState;
    this.showState();
  }
  
  showState(){
    console.log(this.pickerState);
  }


}
