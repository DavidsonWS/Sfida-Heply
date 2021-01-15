import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGameElement, IGameExaminer } from 'src/app/_interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private score: BehaviorSubject<number>;
  private interval: any;
  private time: number;
  private elements: IGameElement[];
  private examiners: IGameExaminer[];
  private elementsSubscribable: BehaviorSubject<Array<IGameElement>>;
  private examinersSubscribable: BehaviorSubject<Array<IGameExaminer>>;

  constructor() {
    this.score = new BehaviorSubject(0);
    this.elementsSubscribable = new BehaviorSubject(Array<IGameElement>(8));
    this.examinersSubscribable = new BehaviorSubject(Array<IGameExaminer>(3));
    this.time = 5000;
  }

  public ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public resetGame(): void {

  }

  public endGame(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    //TO DO
   }

  public startGame(elementsCount: number): void {
    this.initializeElementsArray(elementsCount);
    this.initializeExaminersArray();

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
      this.examiners[i] = { status: 'idle', time: null };
    }

    this.examinersSubscribable.next(this.examiners);
  }

  private addElement(): void {
    const element = this.elements.find((element: IGameElement) => element.status === 'hidden');

    if (!element) {
      // TODO: End game
      console.warn('end game');
      clearInterval(this.interval);
    } else {
      element.weight = Math.floor(Math.random() * Math.floor(10)) + 1;
      element.status = 'visible';
    }

    console.warn(this.elements)
  }

  public changeElementStatus(elementIndex: number): void {

  }

  public getScore(): Observable<number> {
    return this.score.asObservable();
  }

  public addElementToExaminer(examinerId: number, elementId: number): void {
    this.examiners[examinerId].status = 'examining';
    this.examiners[examinerId].time = this.elements[elementId].weight;
    this.elements[elementId].status = 'busy';
    this.examinersSubscribable.next(this.examiners);
    this.elementsSubscribable.next(this.elements);

    const updateTime = setInterval(() => {
      this.examiners[examinerId].time -= 1;
      this.examinersSubscribable.next(this.examiners);
      if (this.examiners[examinerId].time === 0) {
        this.score.next(this.score.value + this.elements[elementId].weight);
        this.examiners[examinerId].status = 'idle';
        this.examiners[examinerId].time = null;
        this.examinersSubscribable.next(this.examiners);
        clearInterval(updateTime);
      }
    }, 1000);
  }

  public getElements(): Observable<Array<IGameElement>> {
    return this.elementsSubscribable.asObservable();
  }

  public getExaminers(): Observable<Array<IGameExaminer>> {
    return this.examinersSubscribable.asObservable();
  }

}
