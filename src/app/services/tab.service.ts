import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  tabIndex$ = new BehaviorSubject<number>(0);

  changeIndex(index: number) {
    this.tabIndex$.next(index);
  }
}
