import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../trello.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  settingsButton:HTMLElement;

  constructor(private trelloService:TrelloService) { }

  ngOnInit() {
    
  }

}
