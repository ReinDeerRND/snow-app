import { Component, OnInit } from '@angular/core';
import { ModalNewWordComponent } from '../modal-new-word/modal-new-word.component';

@Component({
  selector: 'app-modal-edit-word',
  templateUrl: './modal-edit-word.component.html',
  styleUrls: ['./modal-edit-word.component.scss', '../modal-new-word/modal-new-word.component.scss']
})
export class ModalEditWordComponent extends ModalNewWordComponent{
}
