import { Component, OnInit, Renderer2 } from '@angular/core';
import { IPoint } from 'src/app/_intefaces/point.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public score: number;
  public playerName: string;

  constructor(
    private renderer: Renderer2
  ) { }

  public ngOnInit(): void {
    this.score = 0;
    this.playerName = localStorage.getItem('player');
  }

  public onElementRelease(currentPosition: IPoint, element: HTMLElement): void {
    console.warn(currentPosition, element);
    this.resetElementPosition(element);
  }

  private resetElementPosition(element: HTMLElement): void {
    this.renderer.removeAttribute(element, 'style');
  }
}
