import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { IText, IWord } from 'src/app/model/model';
import { LoadDictService } from 'src/app/services/load-dict.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  loadForm: FormGroup;
  newWordsForm: FormGroup;
  newWordsArray: FormArray<any> = new FormArray<any>([]);
  newText?: IText;
  markedText?: any[] = [];
  wordsArray: string[] | null = null;

  constructor(private fb: FormBuilder, private loadDictService: LoadDictService, private snackBar: MatSnackBar) {
    this.loadForm = new FormGroup({
      textTitle: new FormControl(null, [Validators.required]),
      textContent: new FormControl(null, [Validators.required])
    });
    this.newWordsForm = new FormGroup({
      newWordsArray: this.newWordsArray
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newText = this.loadForm.value;
    if (this.newText) {
      this.loadDictService.addText(this.newText);
      this.translateText(this.newText?.textContent);
    }
    this.loadForm.reset();
  }

  translateText(text: string | undefined) {
    if (text) {
      this.getMarkedText(text);
      this.wordsArray = [];
      let preloadWords = _.uniq(_.words(text.toLowerCase()));
      preloadWords.forEach((word: string) => {
        if (!this.loadDictService.isWordExist(word)) {
          this.wordsArray?.push(word);
        }
      });
    }

    this.wordsArray?.forEach(() => {
      this.newWordsArray.push(this.fb.group({
        translate: []
      }))
    })
  }

  getMarkedText(text: string) {
    let textArray = text.split(' ');
    textArray.forEach(word => {
      let foundWord: IWord | null = this.loadDictService.getWord(word.toLowerCase());
      if (foundWord) {
        this.markedText?.push({
          word: word,
          tooltip: foundWord.translate
        });
      } else {
        this.markedText?.push({
          word: word,
          tooltip: null
        });
      }
    });
    console.log(this.markedText);

  }
  reset() {
    this.newWordsArray = new FormArray<any>([]);
    this.wordsArray = [];
    this.newText = undefined;
    this.markedText = [];
  }

  saveToDictionary() {
    let keyWords = this.wordsArray?.map(word => _.zipObject(['key'], [word]));
    const translateWords = this.newWordsForm.value['newWordsArray'];
    let objectForDictionary = _.merge(keyWords, translateWords).filter((item: IWord) => item.translate);
    this.loadDictService.addWordsToDictionary(objectForDictionary);
    this.reset();
    this.snackBar.open("Слова сохранены в словарь", "Закрыть", { duration: 2000 });
  }
}
