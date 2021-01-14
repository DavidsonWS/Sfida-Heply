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
  ) {
    this.score = 0;
  }

  public ngOnInit(): void {
    this.playerName = localStorage.getItem('player');
    this.gameService.startGame(8);
  }

  public onElementRelease(currentPosition: Array<IPoint>, element: HTMLElement): void {
    console.warn(currentPosition, element);
    // this.resetElementPosition(element);
    this.examinerHit(currentPosition[1], element);
  }

  private resetElementPosition(element: HTMLElement): void {
    this.renderer.removeAttribute(element, 'style');
  }

  private examinerHit(position: IPoint, element: HTMLElement): void {
    let elementIndex: number = parseInt(element.id.substr(element.id.length - 1)) - 1;
    let examinerIndex: number = 0;
    if (position.y > window.innerHeight * 0.725 && position.y < window.innerHeight * 0.97) {
      if (position.x < window.innerWidth * 0.34 && position.x > window.innerWidth * 0.15) {
        console.log("Examiner 1");
        examinerIndex = 1;
      }
      if (position.x < window.innerWidth * 0.63 && position.x > window.innerWidth * 0.38) {
        console.log("Examiner 2");
        examinerIndex = 2;
      }
      if (position.x < window.innerWidth * 0.9 && position.x > window.innerWidth * 0.67) {
        console.log("Examiner 3");
        examinerIndex = 3;
      }
    }
    examinerIndex > 0 ? this.gameService.addElementToExaminer(examinerIndex, elementIndex) : this.resetElementPosition(element);
  }

}
