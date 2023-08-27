import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { IWord } from 'src/app/model/model';
import { LoadDictService } from 'src/app/services/load-dict.service';
import { ModalEditWordComponent } from '../modal-edit-word/modal-edit-word.component';
import { ModalNewWordComponent } from '../modal-new-word/modal-new-word.component';

@Component({
  selector: 'app-dict',
  templateUrl: './dict.component.html',
  styleUrls: ['./dict.component.scss']
})
export class DictComponent implements OnInit {
  words: IWord[] = [];
  searchForm: FormGroup;
  get dictLen() {
    return this.words.length;
  }

  constructor(private service: LoadDictService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.words = this.service.getSessionDictionary().sort((a: IWord, b: IWord) => a.key > b.key ? 1 : -1);
    this.searchForm = new FormGroup({
      search: new FormControl(),
    })
  }

  ngOnInit(): void {
    //this.words = this.service.loadDictionaryFromDB();
    this.service.changeDictionary.subscribe(() => {
      this.updateDictionary();
    })
  }

  updateDictionary() { // must be finilized
    this.words = this.service.getSessionDictionary();
  }

  addWord() {
    const dialogRef = this.dialog.open(ModalNewWordComponent, {
      width: '600px',
      data: { key: "", translate: "" },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.addWordToDictionary(result);
      }
    });
  }

  editWord(word: IWord) {
    const dialogRef = this.dialog.open(ModalEditWordComponent, {
      width: '600px',
      data: word,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.editWordInDictionary(result);
      }
    });
  }

  deleteWord(key: string) {
    this.service.deleteWordFromDictionary(key);
    this.snackBar.open(`Слово "${key}" удалено из словаря`, "Закрыть", { duration: 2500 });
  }

  loadBaseDictionary() {
    this.service.loadBaseDictionary();
  }

  saveDictToDB() {
    this.snackBar.open(`Данная опция находится в разработке`, "Закрыть");
  }

  saveDictToFile() {
    let wordsForFile = "";
    this.words.forEach(word=>{
      wordsForFile += `${word.key} | ${word.translate};\n`
    })
    const blob = new Blob(
      [wordsForFile],
      { type: "text/plain;charset=utf-8" }
    );
    saveAs(blob, "Dictionary.txt");
  }
}
