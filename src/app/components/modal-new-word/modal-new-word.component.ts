import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IWord } from 'src/app/model/model';

@Component({
  selector: 'app-modal-new-word',
  templateUrl: './modal-new-word.component.html',
  styleUrls: ['./modal-new-word.component.scss']
})
export class ModalNewWordComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalNewWordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IWord
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
