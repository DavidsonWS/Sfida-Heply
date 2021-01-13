import { Component, OnInit, Renderer2 } from '@angular/core';
import { IPoint } from 'src/app/_interfaces';
import { GameService } from 'src/app/_services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public score: number;
  public playerName: string;

  constructor(
    private renderer: Renderer2,
    private gameService: GameService
  ) { }

  public ngOnInit(): void {
    this.playerName = localStorage.getItem('player');
    this.gameService.startGame(8);
  }

  public onElementRelease(currentPosition: IPoint, element: HTMLElement): void {
    console.warn(currentPosition, element);
    this.resetElementPosition(element);
  }

  private resetElementPosition(element: HTMLElement): void {
    this.renderer.removeAttribute(element, 'style');
  }
}
