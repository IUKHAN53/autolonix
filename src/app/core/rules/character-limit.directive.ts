import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCharacterLimit]'
})
export class CharacterLimitDirective {
  @Input('appCharacterLimit') maxLength: any = 100;

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.length > this.maxLength) {
      this.el.nativeElement.value = value.slice(0, this.maxLength);
    }
  }
}
