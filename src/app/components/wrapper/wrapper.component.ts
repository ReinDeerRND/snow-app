import { Component, OnInit } from '@angular/core';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit {
  selectedIndex = 0;

  constructor(private tabs: TabService) {}

  ngOnInit(): void {
    this.tabs.tabIndex$.subscribe((index) => {
      this.selectedIndex = index;
    });
  }
}
