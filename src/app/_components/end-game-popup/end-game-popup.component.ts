import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/_services';

@Component({
  selector: 'app-end-game-popup',
  templateUrl: './end-game-popup.component.html',
  styleUrls: ['./end-game-popup.component.scss']
})
export class EndGamePopupComponent implements OnInit {
  @Input() score: number;

  public playerName: string;

  constructor(
    private gameService: GameService
  ) {
    this.playerName = localStorage.getItem('player');
  }

  ngOnInit(): void {
  }

  public playAgain(): void {
    this.gameService.startGame(8);
  }

}
