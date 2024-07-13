import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]',
  standalone: true,
})
export class LongPressDirective {
  constructor() {}

  @Output() longPress = new EventEmitter<void>();

  private timeout: any;
  private isPressing: boolean = false;
  private readonly longPressDuration: number = 500; // Adjust the duration as needed

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onPressStart(event: MouseEvent | TouchEvent): void {
    this.isPressing = true;
    this.timeout = setTimeout(() => {
      if (this.isPressing) {
        this.longPress.emit();
      }
    }, this.longPressDuration);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  @HostListener('touchcancel')
  onPressEnd(): void {
    this.isPressing = false;
    clearTimeout(this.timeout);
  }
}
