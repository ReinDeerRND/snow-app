import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IWord } from 'src/app/model/model';
import { LoadDictService } from 'src/app/services/load-dict.service';

@Component({
  selector: 'app-modal-file-add',
  templateUrl: './modal-file-add.component.html',
  styleUrls: ['./modal-file-add.component.scss'],
})
export class ModalFileAddComponent {
  fileFormControl = new FormControl('', [Validators.required]);
  file: File | null = null;
  constructor(
    private service: LoadDictService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModalFileAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  onFileChange(files: FileList | null) {
    if (files?.length) {
      this.file = files[0];
      //const count = files.length > 1 ? `(+${files.length - 1} files)` : '';
      this.fileFormControl.patchValue(`${this.file.name}`);
    } else {
      this.fileFormControl.patchValue('');
    }
  }

  loadFile() {
    if (this.file) {
      let reader = new FileReader();
      let array: IWord[] = [];
      const addFn = this.service;
      const component = this;
      reader.readAsText(this.file);
      reader.onloadend = function () {
        let wordsString = reader.result;
        if (wordsString && typeof wordsString === 'string') {
          const words = wordsString.split(';\n');
          words.forEach((word) => {
            let pair = word.split('|');
            array.push({
              key: pair[0]?.trim(),
              translate: pair[1]?.trim(),
            });
          });
          addFn.addWordsToDictionary(array);
          component.close();
        }
      };
      let snack = this.snackBar;
      reader.onerror = function () {
        console.error(reader.error);
        snack.open(`Произошла ошибка при загрузке словаря`, "Закрыть");
        component.close();
      };
    }
  }
}
