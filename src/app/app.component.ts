import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dialog: MatDialog) { }

  showInfo() {
    this.dialog.open(ModalInfoComponent);
  }
}
