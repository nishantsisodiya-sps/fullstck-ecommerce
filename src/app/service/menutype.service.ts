import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenutypeService {

  private menuTypeSubject = new BehaviorSubject<string>('default');
  public menuType$ = this.menuTypeSubject.asObservable();


  constructor() { }

  updateMenuType(menuType: string) {
    this.menuTypeSubject.next(menuType);
  }

}
