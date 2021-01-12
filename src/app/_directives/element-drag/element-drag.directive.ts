import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appElementDrag]'
})
export class ElementDragDirective implements OnInit, OnDestroy {
  private onMouseDownEvent: EventListenerOrEventListenerObject;
  private onMouseMoveEvent: EventListenerOrEventListenerObject;
  private onMouseUpEvent: EventListenerOrEventListenerObject;

  private initialX: number;
  private initialY: number;

  constructor(
    private htmlElement: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnDestroy(): void {
    this.htmlElement.nativeElement.removeEventListener('mousedown', this.onMouseDownEvent);
    this.htmlElement.nativeElement.removeEventListener('mousemove', this.onMouseMoveEvent);
    this.htmlElement.nativeElement.removeEventListener('mouseup', this.onMouseUpEvent);
  }

  public ngOnInit(): void {
    this.onMouseDownEvent = this.handleMouseDown.bind(this);
    this.onMouseMoveEvent = this.handleMouseMove.bind(this);
    this.onMouseUpEvent = this.handleMouseUp.bind(this);
    this.htmlElement.nativeElement.addEventListener('mousedown', this.onMouseDownEvent);
  }

  private handleMouseDown(event: MouseEvent): void {
    this.initialX = event.offsetX;
    this.initialY = event.offsetY;
    this.htmlElement.nativeElement.removeEventListener('mousedown', this.onMouseDownEvent);
    this.htmlElement.nativeElement.addEventListener('mousemove', this.onMouseMoveEvent);
    this.htmlElement.nativeElement.addEventListener('mouseup', this.onMouseUpEvent);
  }

  private handleMouseMove(event: MouseEvent): void {
    const xOffset: number = event.offsetX - this.initialX;
    const yOffset: number = event.offsetY - this.initialY;
    console.warn(this.initialX, this.initialY, event.offsetX, event.offsetY);
    this.renderer.setStyle(this.htmlElement.nativeElement, 'transform', `translate3d(${xOffset}px, ${yOffset}px, 0)`);
    // console.warn(`translate3d(${xOffset}px, ${yOffset}px, 0)`);
    // this.renderer.setStyle(this.htmlElement.nativeElement, 'transform', 'translate3d(0, 0, 0)');
  }

  private handleMouseUp(): void {
    this.htmlElement.nativeElement.addEventListener('mousedown', this.onMouseDownEvent);
    this.htmlElement.nativeElement.removeEventListener('mousemove', this.onMouseMoveEvent);
    this.htmlElement.nativeElement.removeEventListener('mouseup', this.onMouseUpEvent);
  }
}
