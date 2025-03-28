import { Directive, ElementRef, HostListener, Input, input } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {
  @Input('appChangeColor') color:string='red';


  constructor(private elrf:ElementRef)
   { }
   @HostListener('mouseenter') mouseEnter()
   {
  this.elrf.nativeElement.style.color=this.color;
   }
   
   @HostListener('mouseleave') mouseLeave()
   {
  this.elrf.nativeElement.style.color='';
   }


}
