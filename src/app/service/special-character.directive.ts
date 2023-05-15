import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[NoSpecialCharacter]'
})
export class SpecialCharacterDirective {

  constructor() { }

  @HostListener('keypress' , ['$event']) onkeypress(event:KeyboardEvent){
    const pattern = /[^\w\s]/gi;
    if(pattern.test(event.key))[
      event.preventDefault()
    ]
  }

}
