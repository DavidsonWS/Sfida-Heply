import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public score: number;
  public playerName: string;

  constructor() { }

  ngOnInit(): void {
    this.score = 0;
    this.playerName = localStorage.getItem('player');
  }

}
