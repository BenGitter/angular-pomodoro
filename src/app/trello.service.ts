import { Injectable } from '@angular/core'; 

declare var Trello:any;
declare var jQuery:any;

@Injectable()
export class TrelloService {

  // Authorized?
  authorized:boolean = false;

  // Arrays with data
  Boards = [];
  Lists = [];
  Cards = [];

  // Selected
  selectedBoard:any = {
    name: "Board"
  };
  selectedList:any = {
    name: "List"
  };
  selectedCard:any = {
    name: "Select Trello Card..."
  };

  
  pickerState:boolean = false;  // Trello Picker shown or hidden
  pickerView:string = "board";  // view state of picker
  displayName:string = this.selectedCard.name;
  
  constructor() {
    this.authorize(false);
  }

  changeDisplayName(){
    if(this.selectedCard.name.length > 50){
      this.selectedCard.name = this.selectedCard.name.substring(0,48) + "...";
    }
  }

  toggleDisplay(){
    this.pickerState = !this.pickerState;
  }

  authorize(interactive){
    var self = this;

    Trello.authorize({
        type: "redirect",
        name: "Trello API test",
        scope: {
          read: true,
          write: true },
        expiration: "never",
        interactive: interactive,
        success: function(){
          self.authorized = true;
          self.getBoards(); 
        },
        error: function(err){ console.log(err); }
    });
  }

  getBoards(){
    var self = this;

    Trello.get('/members/me/boards/', 
      function(items){
        items.forEach(function(value, i){
          if(value.name === "Welcome Board"){
            return false;             // leave out 'Welcome Board'
          } 

          self.Boards.push(value);    // push board
          self.Lists[value.id] = [];  // make empty entry
          self.getList(value.id);     // get Lists
        });
      },
      function() { 
        console.log("Failed to load boards"); 
      }
    );
  }

  getList(id){
    var self = this;
    var lists = [];

    Trello.get("/boards/" + id + "/lists",
      function(items){
        items.forEach(function(value, i){
          lists.push(value);              // push list
          self.Cards[value.id] = [];      // make empty entry
          self.getCards(value.id);        // get Cards
        });

        // Only add if more than one list in board
        if(lists.length > 0){
          self.Lists[lists[0].idBoard] = lists;
        }  
      },
      function() { 
        console.log("Failed to load lists"); 
      }
    );
  }

  getCards(id){
    var self = this;
    var cards = [];

    Trello.get("/lists/" + id + "/cards",
      function(items){
        items.forEach(function(value, i){
          cards.push(value);      // push card
        });

        // Only add if more than one card in list
        if(cards.length > 0){
          self.Cards[cards[0].idList] = cards;
        }
      },
      function() { console.log("Failed to load cards"); }
    );
  }
}
