import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGameElement, IGameExaminer } from 'src/app/_interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private score: BehaviorSubject<number>;
  private showPopup: BehaviorSubject<boolean>;
  private elementsSubscribable: BehaviorSubject<Array<IGameElement>>;
  private examinersSubscribable: BehaviorSubject<Array<IGameExaminer>>;

  private interval: NodeJS.Timer;
  private time: number;

  private elements: IGameElement[];
  private examiners: IGameExaminer[];

  constructor() {
    this.score = new BehaviorSubject(0);
    this.showPopup = new BehaviorSubject(false);
    this.elementsSubscribable = new BehaviorSubject(Array<IGameElement>(8));
    this.examinersSubscribable = new BehaviorSubject(Array<IGameExaminer>(3));
    this.time = 0;
  }

  public ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    for (let i = 0; i < this.examiners.length; i++) {
      if (this.examiners[i].timer) {
        clearInterval(this.examiners[i].timer);
      }
    }
  }

  public endGame(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    for (let i = 0; i < this.examiners.length; i++) {
      if (this.examiners[i].timer) {
        clearInterval(this.examiners[i].timer);
      }
    }
    this.showPopup.next(true);
   }

  public startGame(elementsCount: number): void {
    this.time = 0;
    this.showPopup.next(false);
    this.score.next(0);
    this.initializeElementsArray(elementsCount);
    this.initializeExaminersArray();
    this.time = 2000;
    this.interval = setInterval(() => {
      this.addElement();
      this.elementsSubscribable.next(this.elements);
      this.examinersSubscribable.next(this.examiners);
      this.time -= 100;
      console.log('NEW TIME:', this.time);
      console.log('ELEMENTS:', this.elements)
    }, this.time);
  }

  private initializeElementsArray(elementsCount: number): void {
    this.elements = new Array<IGameElement>(elementsCount);

    for (let i = 0; i < elementsCount; i++) {
      this.elements[i] = { weight: null, status: 'hidden' };
    }

    this.elementsSubscribable.next(this.elements);
  }

  private initializeExaminersArray(): void {
    this.examiners = new Array<IGameExaminer>(3);

    for (let i = 0; i < 3; i++) {
      this.examiners[i] = { status: 'idle', time: null, timer: null };
    }

    this.examinersSubscribable.next(this.examiners);
  }

  private addElement(): void {
    const element = this.elements.find((element: IGameElement) => element.status === 'hidden');

    if (!element) {
      this.endGame();
    } else {
      element.weight = Math.floor(Math.random() * Math.floor(15)) + 1;
      element.status = 'visible';
    }

    console.warn(this.elements)
  }

  public changeElementStatus(elementIndex: number): void {
    this.elements[elementIndex].status = 'hidden';
    this.elements[elementIndex].weight = null;
    this.elementsSubscribable.next(this.elements);
  }

  public getScore(): Observable<number> {
    return this.score.asObservable();
  }

  public addElementToExaminer(examinerId: number, elementId: number): void {
    const weight = this.elements[elementId].weight;
    this.examiners[examinerId].status = 'examining';
    this.examiners[examinerId].time = weight;
    this.elements[elementId].status = 'hidden';
    this.examinersSubscribable.next(this.examiners);
    this.elementsSubscribable.next(this.elements);

    this.examiners[examinerId].timer = setInterval(() => {
      this.examiners[examinerId].time -= 1;
      this.examinersSubscribable.next(this.examiners);
      if (this.examiners[examinerId].time === 0) {
        this.score.next(this.score.value + weight);
        this.examiners[examinerId].status = 'idle';
        this.examiners[examinerId].time = null;
        this.examinersSubscribable.next(this.examiners);
        clearInterval(this.examiners[examinerId].timer);
      }
    }, 1000);
  }

  public getElements(): Observable<Array<IGameElement>> {
    return this.elementsSubscribable.asObservable();
  }

  public getExaminers(): Observable<Array<IGameExaminer>> {
    return this.examinersSubscribable.asObservable();
  }

  public getPopup(): Observable<boolean> {
    return this.showPopup.asObservable();
  }

}
