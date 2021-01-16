import { Component, OnInit, Renderer2 } from '@angular/core';
import { IGameElement, IGameExaminer, IPoint } from 'src/app/_interfaces';
import { GameService } from 'src/app/_services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public score: number;
  public playerName: string;

  public elements: IGameElement[];
  public examiners: IGameExaminer[];

  constructor(
    private renderer: Renderer2,
    private gameService: GameService
  ) {
    this.score = 0;
    this.elements = new Array<IGameElement>(8);
    this.examiners = new Array<IGameExaminer>(3);
  }

  public ngOnInit(): void {
    this.playerName = localStorage.getItem('player');
    this.gameService.startGame(8);
    this.updateElements();
    this.updateExaminers();
    this.updateScore();
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
    let examinerIndex: number = null;
    if (position.y > window.innerHeight * 0.725 && position.y < window.innerHeight * 0.97) {
      if (position.x < window.innerWidth * 0.34 && position.x > window.innerWidth * 0.15) {
        console.log("Examiner 1");
        examinerIndex = 0;
      }
      if (position.x < window.innerWidth * 0.63 && position.x > window.innerWidth * 0.38) {
        console.log("Examiner 2");
        examinerIndex = 1;
      }
      if (position.x < window.innerWidth * 0.9 && position.x > window.innerWidth * 0.67) {
        console.log("Examiner 3");
        examinerIndex = 2;
      }
    }
    if (examinerIndex != null) {
      if (this.examiners[examinerIndex].status !== 'examining') {
        this.resetElementPosition(element);
        this.gameService.addElementToExaminer(examinerIndex, elementIndex);
        this.gameService.changeElementStatus(elementIndex);
      } else {
        this.resetElementPosition(element);
      }
    } else {
      this.resetElementPosition(element);
    }
  }

  private updateElements(): void {
    this.gameService.getElements().subscribe((result: Array<IGameElement>) => {
      this.elements = result;
      console.log(this.elements);
    });
  }

  private updateExaminers(): void {
    this.gameService.getExaminers().subscribe((result: Array<IGameExaminer>) => {
      this.examiners = result;
      console.log(this.examiners);
    });
  }

  private updateScore(): void {
    this.gameService.getScore().subscribe((result: number) => {
      this.score = result;
    });
  }

}
