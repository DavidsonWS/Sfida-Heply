import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
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

  public showPopup: boolean;

  constructor(
    private renderer: Renderer2,
    private gameService: GameService
  ) {
    this.score = 0;
    this.elements = new Array<IGameElement>(8);
    this.examiners = new Array<IGameExaminer>(3);
    this.playerName = localStorage.getItem('player');
  }

  public ngOnInit(): void {
    this.gameService.startGame(8);
    this.updateElements();
    this.updateExaminers();
    this.updateScore();
    this.updatePopup();
  }

  public onElementRelease(currentPosition: Array<IPoint>, element: HTMLElement): void {
    console.warn(currentPosition, element);
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
    });
  }

  private updateExaminers(): void {
    this.gameService.getExaminers().subscribe((result: Array<IGameExaminer>) => {
      this.examiners = result;
    });
  }

  private updateScore(): void {
    this.gameService.getScore().subscribe((result: number) => {
      this.score = result;
    });
  }

  private updatePopup(): void {
    this.gameService.getPopup().subscribe((result: any) => {
      this.showPopup = result;
    })
  }

}
