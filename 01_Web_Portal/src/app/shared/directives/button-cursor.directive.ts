import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appButtonCursor]'
})
export class ButtonCursorDirective {

  constructor(private el:ElementRef) { }

  @HostListener('mouseenter') mouseEnter(){
      this.setCursor("auto");
  }

  @HostListener('mouseleave') mouseLeave(){
    this.setCursor("default");
  }

  setCursor(cursor){
    this.el.nativeElement.style.cursor=cursor;
  }

}
