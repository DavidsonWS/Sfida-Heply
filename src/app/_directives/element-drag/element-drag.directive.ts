import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPoint } from 'src/app/_interfaces';

@Directive({
  selector: '[appElementDrag]'
})
export class ElementDragDirective implements OnInit, OnDestroy, OnChanges {
  @Input() public status: string;
  @Output() public released: EventEmitter<Array<IPoint>>;

  private onMouseDownEvent: EventListenerOrEventListenerObject;
  private onMouseMoveEvent: EventListenerOrEventListenerObject;
  private onMouseUpEvent: EventListenerOrEventListenerObject;

  private initialPagePosition: IPoint;
  private initialTranslatePosition: IPoint;
  private currentTranslatePosition: IPoint;

  private elementAngle: number;

  constructor(
    private htmlElement: ElementRef,
    private renderer: Renderer2
  ) {
    this.released = new EventEmitter<Array<IPoint>>();
  }

  public ngOnDestroy(): void {
    this.htmlElement.nativeElement.removeEventListener('mousedown', this.onMouseDownEvent);
    window.removeEventListener('mousemove', this.onMouseMoveEvent);
    window.removeEventListener('mouseup', this.onMouseUpEvent);
  }

  public ngOnInit(): void {
    this.onMouseDownEvent = this.handleMouseDown.bind(this);
    this.onMouseMoveEvent = this.handleMouseMove.bind(this);
    this.onMouseUpEvent = this.handleMouseUp.bind(this);
    this.htmlElement.nativeElement.addEventListener('mousedown', this.onMouseDownEvent);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.status?.currentValue) {
      const element = this.htmlElement.nativeElement;

      if (changes.status.currentValue === 'hidden') {
        this.renderer.setStyle(element, 'display', 'none');
      } else {
        this.renderer.setStyle(element, 'display', 'flex');
        this.renderer.addClass(element, 'animate');
        this.renderer.addClass(element, 'transition');

        setTimeout(() => {
          this.renderer.removeClass(element, 'animate');
          setTimeout(() => {
            this.renderer.removeClass(element, 'transition');
          }, 500);
        });
      }
    }
  }

  private handleMouseDown(event: MouseEvent): void {
    const elementComputedStyle = window.getComputedStyle(this.htmlElement.nativeElement);
    const elementMatrix = new DOMMatrix(elementComputedStyle.transform);

    this.elementAngle = Math.round(Math.asin(elementMatrix.b) * (180 / Math.PI));
    this.initialTranslatePosition = { x: elementMatrix.m41, y: elementMatrix.m42 };
    this.initialPagePosition = { x: event.pageX, y: event.pageY };
    this.currentTranslatePosition = this.initialPagePosition;

    this.htmlElement.nativeElement.removeEventListener('mousedown', this.onMouseDownEvent);
    window.addEventListener('mousemove', this.onMouseMoveEvent);
    window.addEventListener('mouseup', this.onMouseUpEvent);
  }

  private handleMouseMove(event: MouseEvent): void {
    this.currentTranslatePosition = {
      x: this.initialTranslatePosition.x + event.pageX - this.initialPagePosition.x,
      y: this.initialTranslatePosition.y + event.pageY - this.initialPagePosition.y
    };

    this.renderer.setStyle(
      this.htmlElement.nativeElement,
      'transform',
      `translate3d(${this.currentTranslatePosition.x}px, ${this.currentTranslatePosition.y}px, 0) rotate(${this.elementAngle}deg)`
    );
  }

  private handleMouseUp(event: MouseEvent): void {
    window.removeEventListener('mousemove', this.onMouseMoveEvent);
    window.removeEventListener('mouseup', this.onMouseUpEvent);
    this.htmlElement.nativeElement.addEventListener('mousedown', this.onMouseDownEvent);
    this.released.emit([this.currentTranslatePosition, { x: event.pageX, y: event.pageY }]);
  }

}
